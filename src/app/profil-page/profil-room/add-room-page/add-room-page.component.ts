import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component, HostListener,
  OnInit,
  ViewChild
} from '@angular/core';

import {PhotoFormComponent} from './photo-form/photo-form.component';
import {FormGroup} from '@angular/forms';
import {RoomFormComponent} from './room-form/room-form.component';
import {AddressFormComponent} from './address-form/address-form.component';
import {Room} from '../../../models/room';
import {RoomService} from '../../../services/room.service';
import {NotificationService} from '../../../services/notification.service';
import {Router} from '@angular/router';
import {Address} from '../../../models/address';
import {UploadService} from '../../../services/upload.service';
import {AuthService} from '../../../services/auth.service';

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
  mobile = true;

  constructor(private cd: ChangeDetectorRef,
              private roomService: RoomService,
              private notification: NotificationService,
              private uploadService: UploadService,
              private auth: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth <= 600;
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
    this.photoForm = this.photoFormComponent.form;
    this.roomForm = this.roomFormComponent.form;
    this.addressForm = this.addressFormComponent.form;

  }

  submit() {
    const address: Address = this.addressForm.value;
    address.label = this.addressForm.get('label').value.properties.name;
    address.city = this.addressForm.get('city').value.nom;
    console.log(address);
    /*const address = {
      id: null,
      city: this.addressForm.get('city').value.nom,
      label: this.addressForm.get('label').value.properties.name,
      longitude: this.addressForm.get('longitude').value,
      latitude: this.addressForm.get('latitude').value,
      zipCode: this.addressForm.get('zipCode').value
    }*/
    const room: Room = this.roomForm.value;
    room.address = address;
    room.owner = {id: this.auth.getUserId()};
    const photos: File[] = [];
    this.photoForm.value.photos.forEach(photo => photos.push(photo.file));
    this.roomService.create(room).subscribe(
      result =>
        this.uploadService.upload(photos, result.id).subscribe(
          _ => {
            this.notification.showSuccess('Votre salle est enregistrée !');
            this.router.navigateByUrl('/salles');
          }
        )
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 600;
  }

}
