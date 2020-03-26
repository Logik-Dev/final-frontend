import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild
} from '@angular/core';

import {PhotoFormComponent} from './photo-form/photo-form.component';
import {FormGroup} from '@angular/forms';
import {RoomFormComponent} from './room-form/room-form.component';
import {AddressFormComponent} from './address-form/address-form.component';
import {Room} from '../models/room';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-add-room-page',
  templateUrl: './add-room-page.component.html',
  styleUrls: ['./add-room-page.component.scss']
})
export class AddRoomPageComponent implements OnInit, AfterContentChecked {
  @ViewChild(PhotoFormComponent) photoFormComponent: PhotoFormComponent;
  @ViewChild(RoomFormComponent) roomFormComponent: RoomFormComponent;
  @ViewChild(AddressFormComponent) addressFormComponent: AddressFormComponent;
  photoForm: FormGroup;
  roomForm: FormGroup;
  addressForm: FormGroup;
  constructor(private cd: ChangeDetectorRef,
              private roomService: RoomService) {
  }

  ngOnInit(): void {
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
    this.photoForm = this.photoFormComponent.form;
    this.roomForm = this.roomFormComponent.form;
    this.addressForm = this.addressFormComponent.form;

  }
  submit() {
    const room: Room = this.roomForm.value;
    room.address = this.addressForm.value;
    const photos: File[] = [];
    this.photoForm.value.photos.forEach(photo => photos.push(photo.file));
    this.roomService.addRoom(room, photos);

  }

}