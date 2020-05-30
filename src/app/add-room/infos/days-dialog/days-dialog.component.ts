import {Component, Inject, OnInit} from '@angular/core';
import {DAYS} from '../../../../utils/days';
import {AbstractControl, FormArray, FormControl} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-days-dialog',
  templateUrl: './days-dialog.component.html',
  styleUrls: ['./days-dialog.component.scss']
})
export class DaysDialogComponent implements OnInit {
  days = DAYS;
  formArray = new FormArray([]);

  constructor(private matDialogRef: MatDialogRef<DaysDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  /**
   * Créer le formulaire
   */
  initForm(): void {
    const daysArray = this.data.days.value;
    if (daysArray && daysArray.length) {
      daysArray.forEach(d => this.formArray.push(this.createFormControl(d)));
    }
  }

  /**
   * Vérifier si un jour sélèctionné
   * @param day le jour à vérifier
   */
  isChecked(day): boolean {
    return this.formArray.value.includes(day);
  }

  /**
   * Ajouter un jour au FormArray ou l'enlever après un clique
   * @param event l'évènement envoyé par la checkbox
   */
  daySelected(event: any): void {
    if (event.checked) {
      this.formArray.push(this.createFormControl(event.source.value));
    } else {
      const controls = this.formArray.controls.filter(c => c.value !== event.source.value);
      this.formArray = new FormArray(controls);
    }
  }

  /**
   * Selectionner tous les jours si la checkbox est cochée
   * @param event l'évènement provenant de la checkbox
   */
  allDaysSelected(event: any): void {
    this.formArray = new FormArray([]);
    if (event.checked) {
      this.days.forEach(d => this.formArray.push(this.createFormControl(d)));
    }
  }

  /**
   * Créer un objet FormControl avec ou sans jour fourni
   * @param day le jour à insérer dans le FormControl
   */
  createFormControl(day?: string): FormControl {
    return new FormControl(day ? day : '');
  }

  /**
   * Fermer la dialog si au moins un jour est sélèctionné
   */
  onSubmit() {
    this.formArray.value.length && this.matDialogRef.close(this.formArray);
  }

 
}
