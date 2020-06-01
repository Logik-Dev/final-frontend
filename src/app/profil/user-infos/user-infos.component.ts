import {AfterViewInit, Component, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {User} from '../../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-profil-info',
  templateUrl: './user-infos.component.html',
  styleUrls: ['./user-infos.component.scss']
})
export class UserInfosComponent implements OnInit, AfterViewInit {
  user$: BehaviorSubject<User>;
  form: FormGroup;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  @ViewChildren('dialogButtons') dialogButtons: QueryList<MatButton>;

  constructor(private fb: FormBuilder,
              private us: UserService,
              private dialog: MatDialog,
              private notification: NotificationService,
              private router: Router) {

  }

  ngOnInit(): void {
    this.user$ = this.us.currentUser;
    this.createForm();

  }

  ngAfterViewInit(): void {
    this.dialog.afterAllClosed.subscribe(
      _ => this.clearIconsFocus()
    );
  }

  /**
   * Créer le formulaire
   */
  createForm() {
    this.form = this.fb.group({
      firstname: [this.user$.value.firstname, Validators.required],
      lastname: [this.user$.value.lastname, Validators.required],
      email: [this.user$.value.email, [Validators.required, Validators.email]],
      password: ['', []],
      passwordCheck: ['', []]
    });
  }

  /**
   * Mettre à jour les infos de l'utilisateur
   */
  updateUser() {
    this.closeDialog();
    // Remplir l'objet User
    const userToUpdate: User = {};
    for (const key in this.form.value) {
      if (this.form.value[key]) {
        userToUpdate[key] = this.form.value[key];
      }
    }
    userToUpdate.id = this.user$.value.id;

    // Effectuer la requête de modification
    this.us.update(userToUpdate)
      .subscribe(_ => {
        this.notification.showSuccess('Profil modifié !');
        this.router.navigateByUrl('/').finally();
      });
  }

  /**
   * Ouvrir la dialog de confirmation
   * @param update true si c'est une mise à jour false si c'est une suppression
   */
  openConfirmDialog(update: boolean): void {
    this.dialog.open(this.confirmDialog, {
      data: {update}
    });
  }

  /**
   * Supprimer le compte utilisateur
   */
  deleteUser() {
    this.closeDialog();
    this.us.delete(this.user$.value.id)
      .subscribe(_ => {
        this.notification.showSuccess('Profil supprimé');
        this.router.navigateByUrl('/').finally();
      });
  }

  /**
   * Supprimer le focus sur les icones après fermeture de la dialog
   */
  clearIconsFocus(): void {
    this.dialogButtons.forEach(b => b._getHostElement().classList.remove('cdk-program-focused'));
  }

  /**
   * Fermer la dialog
   */
  closeDialog(): void {
    this.dialog.closeAll();
  }

}
