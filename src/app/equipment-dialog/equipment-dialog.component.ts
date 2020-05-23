import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, Validators} from '@angular/forms';
import {EquipmentService} from '../services/equipment.service';
import {Observable} from 'rxjs';
import {Equipment} from '../models/equipment';
import {RoomEquipment} from '../models/room-equipment';

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
      quantity: [equipment ? equipment.quantity : '', [Validators.min(1), Validators.required]]
    });
  }
  initEquipment() {
    const equipments = this.data.equipments.value;
    if (equipments.length) {
      equipments.forEach(e =>
        this.formArray.push(this.createEquipmentForm(e)));
    } else {
      this.formArray.push(this.createEquipmentForm());
    }
  }

  addEquipment() {
    this.formArray.valid && this.formArray.push(this.createEquipmentForm());
  }

  removeEquipment(index: number) {
    this.formArray.value.length > 1 && this.formArray.removeAt(index);
  }

  onSubmit() {
    this.matDialogRef.close(this.formArray.value.filter(equipment => equipment.id));
  }
  compareFn(e1: any, e2: any) {
    return e1.id === e2.id;
  }
}
