import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators
} from '@angular/forms';
import {RoomTypeService} from '../../../services/room-type.service';
import {Observable} from 'rxjs';
import {RoomType} from '../../../models/room-type';
import {Volume} from '../../../models/volume';
import {MatDialog} from '@angular/material/dialog';
import {PriceDialogComponent} from './price-dialog/price-dialog.component';
import {EquipmentDialogComponent} from './equipment-dialog/equipment-dialog.component';
import {EventTypeDialogComponent} from './event-type-dialog/event-type-dialog.component';
import {DaysDialogComponent} from './days-dialog/days-dialog.component';
import {MatButton} from '@angular/material/button';
import {map} from 'rxjs/operators';
import {RoomService} from '../../../services/room.service';
import {atLeastOne} from '../../../utils/validators';

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
    // Après fermeture d'une dialog supprimer le focus sur mat-icon-button
    this.dialog.afterAllClosed.subscribe(_ =>
      this.clearDialogButtonFocus());
  }

  /**
   * Création du formulaire
   */
  createForm() {
    this.form = this.fb.group({
      maxCapacity: ['', Validators.required],
      size: ['', Validators.required],
      type: ['', Validators.required],
      maxVolume: ['', Validators.required],
      price: ['', Validators.required],
      equipments: this.fb.array([]),
      eventTypes: this.fb.array([]),
      availableDays: this.fb.array([], atLeastOne()),
      name: new FormControl('', {
        validators: [Validators.required],
        asyncValidators: this.roomService.nameAvailable(),
        updateOn: 'blur'
      }),
    });
  }

  /**
   * Price dialog
   */
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

  /**
   * Equipment dialog
   * @param custom si on choisi équipement personnalisé
   */
  openEquipmentDialog(custom: boolean) {
    const dialogRef = this.dialog.open(EquipmentDialogComponent, {
      data: {equipments: this.equipments.value, custom},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeEquipments(value)
    );
  }

  /**
   * Ajouter les équipements choisis au formulaire
   * @param equipments le form array a copier
   */
  mergeEquipments(equipments: FormArray) {
    equipments.controls.forEach(v =>
      !this.isInclude(v, this.equipments) && this.equipments.push(v));
  }


  /**
   * Vérifier si un form array contient un équipement ou évènement
   * @param control le champ à vérifier
   * @param array le form array à inspecter
   */
  isInclude(control: AbstractControl, array: FormArray): boolean {
    console.log(array);
    const controls = array.controls.filter(c => c.value.id === control.value.id);
    return controls.length > 0;
  }

  /**
   * Event Dialog
   */
  openEventTypeDialog(): void {
    const dialogRef = this.dialog.open(EventTypeDialogComponent, {
      data: {eventTypes: this.events},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeEvents(value)
    );
  }

  /**
   * Ajouter les évènements choisis au formulaire
   * @param array le form array à copier
   */
  mergeEvents(array: FormArray): void {
    array.controls.forEach(c =>
      !this.isInclude(c, this.events) && this.events.push(c));
  }

  /**
   * Days dialog
   */
  openDaysDialog(): void {
    const dialogRef = this.dialog.open(DaysDialogComponent, {
      data: {days: this.days},
      panelClass: 'dialog-form'
    });
    dialogRef.afterClosed().subscribe(
      value => value && this.mergeDays(value)
    );
  }

  /**
   * Ajouter les jours choisis au formulaire
   * @param array le form array à copier
   */
  mergeDays(array: FormArray): void {
    array.controls.forEach(c =>
      !this.days.value.includes(c.value) && this.days.push(c)
    );
  }

  /**
   * Supprimer un élèment d'un form array
   * @param index la position de l'élèment à supprimer
   * @param array le form array visé
   */
  deleteFormArrayElement(index: number, array: FormArray) {
    array.removeAt(index);
  }

  /**
   * Supprimer le focus sur les mat-icon-button
   */
  clearDialogButtonFocus(): void {
    this.dialogButtons.forEach(c => c._getHostElement().classList.remove('cdk-program-focused'));
  }

  /**
   * Accesseurs
   */
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
