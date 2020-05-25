import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {EquipmentService} from '../services/equipment.service';
import {Observable} from 'rxjs';
import {Equipment} from '../models/equipment';

@Component({
  selector: 'app-equipment-dialog',
  templateUrl: './equipment-dialog.component.html',
  styleUrls: ['./equipment-dialog.component.scss']
})
export class EquipmentDialogComponent implements OnInit {
  formArray = new FormArray([]);
  equipments$: Observable<Equipment[]>;

  constructor(private matDialogRef: MatDialogRef<EquipmentDialogComponent>,
              private fb: FormBuilder,
              private equipmentService: EquipmentService,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.equipments$ = this.equipmentService.findAll();
    this.initEquipment();
  }

  createEquipmentForm(equipment?: any) {
    return this.fb.group({
      id: [equipment ? equipment.id : '', Validators.required],
      quantity: [equipment ? equipment.quantity : '', [Validators.min(1), Validators.required]],
      custom: [this.data.custom]
    });
  }
  initEquipment() {
    let equipments = this.data.equipments;
    if (equipments && equipments.length) {
      equipments = this.data.custom ? equipments.filter(e => e.custom) : equipments.filter(e => !e.custom);
      if (!equipments.length) {
        this.emptyEquipments();
      } else {
        equipments.forEach(e => this.formArray.push(this.createEquipmentForm(e)));
      }
    } else {
      this.emptyEquipments();
    }
  }

  emptyEquipments() {
    this.formArray.push(this.createEquipmentForm());
  }
  addEquipment() {
    this.formArray.valid && this.formArray.push(this.createEquipmentForm());
  }

  removeEquipment(index: number) {
    this.formArray.value.length > 1 && this.formArray.removeAt(index);
  }

  onSubmit() {
    this.matDialogRef.close(this.formArray);
  }
  compareFn(e1: any, e2: any) {
    return e1 === e2;
  }
}
