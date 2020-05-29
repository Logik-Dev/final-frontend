import {Component, Inject, OnInit} from '@angular/core';
import {DAYS} from '../utils/days';
import {FormArray, FormBuilder, FormControl, Validators} from '@angular/forms';
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
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    const daysArray = this.data.days.value;
    if (daysArray && daysArray.length) {
      daysArray.forEach(d => this.formArray.push(this.createFormControl(d)));
    }
  }
  isChecked(day) {
    return this.formArray.value.includes(day);
  }
  daySelected(event: any) {
    if (event.checked) {
      this.formArray.push(this.createFormControl(event.source.value));
    } else {
      const controls = this.formArray.controls.filter(c => c.value !== event.source.value);
      this.formArray = new FormArray(controls);
    }
  }
  allDaysSelected(event: any) {
    this.formArray = new FormArray([]);
    if (event.checked) {
      this.days.forEach(d => this.formArray.push(this.createFormControl(d)));
    }
  }

  createFormControl(day?: string) {
    return new FormControl(day ? day : '');
  }

  onSubmit() {
    this.formArray.value.length && this.matDialogRef.close(this.formArray);
  }
}
