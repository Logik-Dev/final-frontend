import {AfterContentChecked, ChangeDetectorRef, Component, HostListener, OnInit, ViewChild} from '@angular/core';

import {PhotoFormComponent} from './photos/photo-form.component';
import {FormArray, FormGroup} from '@angular/forms';
import {AddressFormComponent} from './address/address-form.component';
import {Room} from '../../models/room';
import {RoomService} from '../../services/room.service';
import {NotificationService} from '../../services/notification.service';
import {Router} from '@angular/router';
import {Address} from '../../models/address';
import {UploadService} from '../../services/upload.service';
import {UserService} from '../../services/user.service';
import {RoomInfosFormComponent} from './infos/room-infos-form.component';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-add-room-page',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit, AfterContentChecked {
  @ViewChild(PhotoFormComponent) photoFormComponent: PhotoFormComponent;
  @ViewChild(RoomInfosFormComponent) roomInfosFormComponent: RoomInfosFormComponent;
  @ViewChild(AddressFormComponent) addressFormComponent: AddressFormComponent;
  photoForm: FormArray;
  roomInfosForm: FormGroup;
  addressForm: FormGroup;
  mobile = true;

  constructor(private cd: ChangeDetectorRef,
              private roomService: RoomService,
              private notification: NotificationService,
              private uploadService: UploadService,
              private us: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth <= 600;
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
    this.photoForm = this.photoFormComponent.formArray;
    this.roomInfosForm = this.roomInfosFormComponent.form;
    this.addressForm = this.addressFormComponent.form;

  }

  /**
   * Remplir l'objet Room puis effectuer les requêtes (photos et salle)
   */
  submit() {


    // Infos
    const room: Room = this.roomInfosForm.value;
    room.equipments = this.roomInfosForm.controls.equipments.value;
    room.availableDays = this.roomInfosForm.controls.availableDays.value;
    room.eventTypes = this.roomInfosForm.controls.eventTypes.value;

    // Adresse
    const address: Address = this.addressForm.value;
    address.label = this.addressForm.get('label').value.properties.name;
    address.city = this.addressForm.get('city').value.nom;
    room.address = address;

    // Photos
    const photos: File[] = [];
    this.photoForm.value.forEach(photo => photos.push(photo.file));

    // Enregistrement
    this.roomService.create(room)
      .subscribe(
      result =>
        this.uploadService.upload(photos, result.id).subscribe(
          _ => {
            this.notification.showSuccess('Votre salle est enregistrée !');
            this.router.navigateByUrl('/salles');
          }
        )
    );
  }

  /**
   * Définir la variable mobile pour afficher le formulaire adapté (horizontal ou vertical)
   * @param event surveiller le redimensionnement
   */
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.mobile = event.target.innerWidth <= 600;
  }

}
