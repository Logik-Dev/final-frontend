import {Component, Inject, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {EventType} from '../models/event-type';
import {EventTypeService} from '../services/event-type.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormArray, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-type-dialog',
  templateUrl: './event-type-dialog.component.html',
  styleUrls: ['./event-type-dialog.component.scss']
})
export class EventTypeDialogComponent implements OnInit {
  eventTypes$: Observable<EventType[]>;
  formArray = new FormArray([]);

  constructor(private eventTypeService: EventTypeService,
              private matDialogRef: MatDialogRef<EventTypeDialogComponent>,
              private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.eventTypes$ = this.eventTypeService.findAll();
    this.initForm();
  }

  createEventTypeForm(eventType?: EventType) {
    return this.fb.group({
      id: [eventType ? eventType.id : '', Validators.required]
    });
  }

  initForm() {
    const eventTypes = this.data.eventTypes.value;
    if (eventTypes && eventTypes.length) {
      eventTypes.forEach(e => this.formArray.push(this.createEventTypeForm(e)));
    } else {
      this.formArray.push(this.createEventTypeForm());
    }
  }

  addEvent() {
    this.formArray.valid && this.formArray.push(this.createEventTypeForm());
  }

  removeEvent(index: number) {
    this.formArray.value.length > 1 && this.formArray.removeAt(index);
  }

  onSubmit() {
    this.matDialogRef.close(this.formArray.value.filter(v => v.id));
  }

  compareFn(e1: any, e2: any) {
    return e1 === e2;
  }

}
