import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomTypeService} from '../services/room-type.service';
import {Observable} from 'rxjs';
import {RoomType} from '../models/room-type';
import {Volume} from '../models/volume';
import {MatDialog} from '@angular/material/dialog';
import {PriceDialogComponent} from '../price-dialog/price-dialog.component';
import {EquipmentDialogComponent} from '../equipment-dialog/equipment-dialog.component';
import {EventTypeDialogComponent} from '../event-type-dialog/event-type-dialog.component';
import {DaysDialogComponent} from '../days-dialog/days-dialog.component';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-room-infos-form',
  templateUrl: './room-infos-form.component.html',
  styleUrls: ['./room-infos-form.component.scss']
})
export class RoomInfosFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  volumes = Object.keys(Volume);
  roomTypes$: Observable<RoomType[]>;
  equipmentsFormArray = new FormArray([]);
  eventsFormArray = new FormArray([]);
  @ViewChildren('dialogButtons') dialogButtons: QueryList<MatButton>;

  constructor(private fb: FormBuilder,
              private roomTypeService: RoomTypeService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.roomTypes$ = this.roomTypeService.findAll();
    this.createForm();
  }

  ngAfterViewInit() {
    this.dialog.afterAllClosed.subscribe(_ =>
      this.clearDialogButtonFocus());
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      maxCapacity: ['', Validators.required],
      size: ['', Validators.required],
      type: ['', Validators.required],
      maxVolume: ['', Validators.required],
      price: [0, Validators.required],
      equipments: [this.equipmentsFormArray],
      eventTypes: [this.eventsFormArray],
      availableDays: [this.fb.array([])]
    });
  }

  onSubmit() {
    this.form.controls.availableDays.setValue(this.days.value);
    this.form.controls.equipments.setValue(this.equipments.value);
    console.log(this.days, this.equipments);
  }

  openPriceDialog() {
    const dialogRef = this.dialog.open(PriceDialogComponent, {
      data: {price: this.form.controls.price.value},
      width: '20rem',
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.form.controls.price.setValue(value)
    );
  }

  openEquipmentDialog(custom: boolean) {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      data: {equipments: this.equipments.value, custom},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeEquipments(value)
    );
  }

  mergeEquipments(value: FormArray) {
    value.controls.forEach(v =>
      !this.isInclude(v, this.equipmentsFormArray) && this.equipmentsFormArray.push(v));
  }

  deleteEquipment(index: number) {
    this.equipmentsFormArray.removeAt(index);
  }

  deleteEvent(index: number) {
    this.eventsFormArray.removeAt(index);
  }

  isInclude(control: AbstractControl, array: FormArray) {
    const controls = array.controls.filter(c => c.value.id === control.value.id);
    return controls.length > 0;
  }

  openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      data: {eventTypes: this.events},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value &&  this.mergeEvents(value)
    );
  }
  mergeEvents(array: FormArray) {
    array.controls.forEach(c =>
      !this.isInclude(c, this.eventsFormArray) && this.eventsFormArray.push(c));
  }

  openDaysDialog() {
    const dialogRef = this.dialog.open(DaysDialogComponent, {
      data: {days: this.days},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.form.controls.availableDays.setValue(value)
    );
  }

  clearDialogButtonFocus() {
    this.dialogButtons.forEach(c => c._getHostElement().classList.remove('cdk-program-focused'));
  }

  get equipments() {
    return this.form.get('equipments').value;
  }

  get events() {
    return this.form.get('eventTypes').value;
  }

  get days() {
    return this.form.get('availableDays').value;
  }
}
