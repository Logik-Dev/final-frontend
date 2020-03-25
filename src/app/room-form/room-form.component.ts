import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RoomService} from '../services/room.service';
import {Room} from '../models/room';
import {Observable} from 'rxjs';
import {RoomType} from '../models/room-type';
import {Equipment} from '../models/equipment';

@Component({
  selector: 'app-room-form',
  templateUrl: './room-form.component.html',
  styleUrls: ['./room-form.component.scss']
})
export class RoomFormComponent implements OnInit {
  photoForm: FormGroup;
  roomForm: FormGroup;
  addressForm: FormGroup;
  photosUrl = [];
  photoFiles: File[] = [];
  roomTypes$: Observable<RoomType[]>;
  equipments: Equipment[] = [];
  equipments$: Observable<Equipment[]>;
  constructor(private fb: FormBuilder,
              private roomService: RoomService) { }

  ngOnInit(): void {
    this.roomTypes$ = this.roomService.getTypes();
    this.photoForm = this.fb.group({files: ''});
    this.roomForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      type: ['']
      /**
      maxCapacity: ['', [Validators.required, Validators.max(1000)]],
      price: ['', Validators.required ],
      size: ['', Validators.required],
      availableDays: ['', Validators.required],
      type: ['', Validators.required],
      equipments: ['']
       **/
    });
  }

  onSubmitPhoto(files: FileList) {
      if (this.photoFiles.length < 3) {
        const currentFile = files.item(0);
        this.photoFiles.push(currentFile);
        const reader = new FileReader();
        reader.readAsDataURL(currentFile);
        reader.onload = (event: any) =>
          this.photosUrl.push(event.target.result);
      }
  }
  onCheckBoxChange(event) {

  }
  onSubmit(data: Room) {
      this.roomService.addRoom(data, this.photoFiles);
  }

}
