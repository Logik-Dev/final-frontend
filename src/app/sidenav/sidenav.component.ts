import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  constructor(public us: UserService) { }

  ngOnInit(): void {
  }

  doClose() {
    this.sidenavClose.emit();
  }

  logout() {
    this.us.logout();
    this.doClose();
  }

}
