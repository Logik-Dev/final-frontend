import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomTypeService} from '../services/room-type.service';
import {Observable} from 'rxjs';
import {RoomType} from '../models/room-type';
import {Volume} from '../models/volume';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PriceDialogComponent} from '../price-dialog/price-dialog.component';
import {EquipmentDialogComponent} from '../equipment-dialog/equipment-dialog.component';
import {EventTypeDialogComponent} from '../event-type-dialog/event-type-dialog.component';

@Component({
  selector: 'app-room-infos-form',
  templateUrl: './room-infos-form.component.html',
  styleUrls: ['./room-infos-form.component.scss']
})
export class RoomInfosFormComponent implements OnInit {
  form: FormGroup;
  volumes = Object.keys(Volume);
  roomTypes$: Observable<RoomType[]>;

  constructor(private fb: FormBuilder,
              private roomTypeService: RoomTypeService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.roomTypes$ = this.roomTypeService.findAll();
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      maxCapacity: ['', Validators.required],
      size: ['', Validators.required],
      type: ['', Validators.required],
      maxVolume: ['', Validators.required],
      price: [0, Validators.required],
      equipments: [this.fb.array([])],
      eventTypes: [this.fb.array([])]
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }
  openPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      data: {price: this.form.controls.price.value},
      width: '20rem',
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => {
        this.form.controls.price.setValue(value);
      }
    );
  }

  openEquipmentDialog() {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      data: {equipments: this.equipments},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => this.form.controls.equipments.setValue(value)
    );
  }

  openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      data: {eventTypes: this.eventTypes},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => this.form.controls.eventTypes.setValue(value)
    );
  }

  get equipments() {
    return this.form.get('equipments') as FormArray;
  }

  get eventTypes() {
    return this.form.get('eventTypes') as FormArray;
  }
}
