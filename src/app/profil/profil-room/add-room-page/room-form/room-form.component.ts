import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../../../../services/room.service';
import {Observable} from 'rxjs';
import {RoomType} from '../../../../models/room-type';
import {Equipment} from '../../../../models/equipment';
import {RoomTypeService} from '../../../../services/room-type.service';
import {EquipmentService} from '../../../../services/equipment.service';
import {DAYS} from '../../../../utils/days';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  days = DAYS;
  roomTypes$: Observable<RoomType[]>;
  equipments$: Observable<Equipment[]>;
  form: FormGroup;
  constructor(private fb: FormBuilder,
              private roomService: RoomService,
              private roomTypeService: RoomTypeService,
              private equipmentService: EquipmentService) { }

  ngOnInit(): void {
    this.roomTypes$ = this.roomTypeService.findAll();
    this.equipments$ = this.equipmentService.findAll();
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', Validators.required],
      size: ['', Validators.required],
      maxCapacity: ['', Validators.required],
      type: ['', Validators.required],
      equipments: this.fb.array([]),
      availableDays: this.fb.array([], [Validators.required])
    });
  }


  checkboxChange(event, i) {
    if (event.checked) {
      this.availableDays.push(new FormControl(event.source.value));
    } else {
      this.availableDays.removeAt(i);
    }
  }
  newEquipment(event) {
    if (this.equipments.value.indexOf(event.source.value) < 0) {
      this.equipments.push(new FormControl(event.source.value));
    }
  }
  deleteEquipment(i) {
    this.equipments.removeAt(i);
    console.log(this.equipments.value);
  }
  get availableDays() {
    return this.form.get('availableDays') as FormArray;
  }

  get equipments() {
    return this.form.get('equipments') as FormArray;
  }
}
