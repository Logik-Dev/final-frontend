import {Component, Inject, OnInit} from '@angular/core';
import * as moment from 'moment';
import {DATE_FORMAT} from '../../../../utils/dates';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CommentService} from '../../../../services/comment.service';
import {Comment} from '../../../../models/comment';
import {NotificationService} from '../../../../services/notification.service';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {
  form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private fb: FormBuilder,
              private commentService: CommentService,
              private notification: NotificationService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Créer le formulaire
   */
  createForm(): void {
    this.form = this.fb.group({
      content: ['', Validators.required],
      rating: [5, Validators.required],
      author: [{id: this.data.userId}],
      room: [{id: this.data.roomId}]
    });
  }

  /**
   * Vérifier si la date de fin de la réservation est passée
   */
  canComment(): boolean {
    return moment(this.data.lastDate, DATE_FORMAT).isBefore(moment());
  }

  /**
   * Enregistrer le commentaire
   * @param data l'objet Comment à enregistrer
   */
  onSubmit(data: Comment): void {
    if (this.form.invalid) {
      this.notification.showError('Veuillez remplir tout les champs');
    } else {
      this.commentService.create(data).subscribe(_ => {
          this.notification.showSuccess('Merci pour votre commentaire');
          this.closeDialog();
        }
      );
    }
  }

  /**
   * Fermer la dialog
   */
  closeDialog(): void {
    this.dialogRef.close();
  }
}
