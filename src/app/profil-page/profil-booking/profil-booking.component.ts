import {Component, Input, OnInit} from '@angular/core';
import {User} from '../../models/user';

@Component({
  selector: 'app-profil-booking',
  templateUrl: './profil-booking.component.html',
  styleUrls: ['./profil-booking.component.scss']
})
export class ProfilBookingComponent implements OnInit {
  @Input() user: User;
  displayedColumns: string[] = ['begin', 'end', 'start', 'finish', 'weekly'];
  constructor() { }

  ngOnInit(): void {

  }

  parseDate(date): string {
    return date.split(' ')[0];
  }
  parseHour(date): string {
    return date.split(' ')[1];
  }
}
