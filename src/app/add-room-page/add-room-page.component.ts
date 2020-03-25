import {Component, OnInit, ViewChild} from '@angular/core';
import {PhotoFormComponent} from './photo-form/photo-form.component';

@Component({
  selector: 'app-add-room-page',
  templateUrl: './add-room-page.component.html',
  styleUrls: ['./add-room-page.component.scss']
})
export class AddRoomPageComponent implements OnInit {
  @ViewChild(PhotoFormComponent) photoForm;
  constructor() { }

  ngOnInit(): void {
  }

}
