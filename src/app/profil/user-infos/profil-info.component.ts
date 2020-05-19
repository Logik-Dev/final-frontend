import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {BehaviorSubject} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profil-info',
  templateUrl: './profil-info.component.html',
  styleUrls: ['./profil-info.component.scss']
})
export class ProfilInfoComponent implements OnInit {
  user$: BehaviorSubject<User>;
  form: FormGroup;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
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

  createForm() {
    this.form = this.fb.group({
      firstname: [this.user$.value.firstname, Validators.required],
      lastname: [this.user$.value.lastname, Validators.required],
      email: [this.user$.value.email, [Validators.required, Validators.email]],
      password: ['', []],
      passwordCheck: ['', []]
    });
  }

  updateClick() {
    this.dialog.open(this.confirmDialog, {
      data: {update: true}
    });
  }

  updateUser() {
    this.closeDialog();
    const userToUpdate: User = {};
    for (const key in this.form.value) {
      if (this.form.value[key]) {
        userToUpdate[key] = this.form.value[key];
      }
    }
    userToUpdate.id = this.user$.value.id;
    this.us.update(userToUpdate)
      .subscribe(_ => {
        this.notification.showSuccess('Profil modifié !');
        this.router.navigateByUrl('/').finally();
      });
  }

  deleteClick() {
    this.dialog.open(this.confirmDialog, {
      data: {update: false}
    });
  }

  deleteUser() {
    this.closeDialog();
    this.us.delete(this.user$.value.id)
      .subscribe(_ => {
        this.notification.showSuccess('Profil supprimé');
        this.router.navigateByUrl('/').finally();
      });
  }
  closeDialog() {
    this.dialog.closeAll();
  }



}
