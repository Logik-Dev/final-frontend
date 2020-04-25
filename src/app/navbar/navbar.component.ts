import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  user: User;
  constructor(public auth: AuthService,
              public userService: UserService) { }

  ngOnInit(): void {
    if (this.auth.isAuthenticated()) {
      this.userService.findById(this.auth.getUserId())
        .subscribe(user => this.user = user );
    }
  }
}
