import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn, Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from '@angular/forms';
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
import {map} from 'rxjs/operators';
import {RoomService} from '../services/room.service';
import {ValidateFn} from 'codelyzer/walkerFactory/walkerFn';
import {atLeastOne} from '../utils/validators';

@Component({
  selector: 'app-room-infos-form',
  templateUrl: './room-infos-form.component.html',
  styleUrls: ['./room-infos-form.component.scss']
})
export class RoomInfosFormComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  volumes = Object.keys(Volume);
  roomTypes$: Observable<RoomType[]>;
  @ViewChildren('dialogButtons') dialogButtons: QueryList<MatButton>;

  constructor(private fb: FormBuilder,
              private roomTypeService: RoomTypeService,
              private roomService: RoomService,
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
      name: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: this.nameAvailable(),
        updateOn: 'blur'
      }),
      maxCapacity: ['', Validators.required],
      size: ['', Validators.required],
      type: ['', Validators.required],
      maxVolume: ['', Validators.required],
      price: ['', Validators.required],
      equipments: this.fb.array([]),
      eventTypes: this.fb.array([]),
      availableDays: this.fb.array([],  atLeastOne())
    });
  }

  nameAvailable(): AsyncValidatorFn {
    return (nameControl: AbstractControl): Observable<ValidationErrors | null> => {
      const name = nameControl.value;
      return this.roomService.exists({name}).pipe(
        map(response => response.result ? {nameExists: true} : null)
      );
    };
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
      !this.isInclude(v, this.equipments) && this.equipments.push(v));
  }

  deleteEquipment(index: number) {
    this.equipments.removeAt(index);
  }

  deleteEvent(index: number) {
    this.events.removeAt(index);
  }

  deleteDay(index: number) {
    this.days.removeAt(index);

  }

  isInclude(control: AbstractControl, array: FormArray) {
    console.log(array);
    const controls = array.controls.filter(c => c.value.id === control.value.id);
    return controls.length > 0;
  }

  openEventTypeDialog() {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      data: {eventTypes: this.events},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeEvents(value)
    );
  }

  mergeEvents(array: FormArray) {
    array.controls.forEach(c =>
      !this.isInclude(c, this.events) && this.events.push(c));
  }

  openDaysDialog() {
    const dialogRef = this.dialog.open(DaysDialogComponent, {
      data: {days: this.days},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeDays(value)
    );
  }

  mergeDays(array: FormArray) {
    array.controls.forEach(c =>
      !this.days.value.includes(c.value) && this.days.push(c)
    );
  }

  clearDialogButtonFocus() {
    this.dialogButtons.forEach(c => c._getHostElement().classList.remove('cdk-program-focused'));
  }

  get equipments() {
    return this.form.get('equipments') as FormArray;
  }

  get events() {
    return this.form.get('eventTypes') as FormArray;
  }

  get days() {
    return this.form.get('availableDays') as FormArray;
  }
}
