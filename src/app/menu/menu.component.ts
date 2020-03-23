import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter();
  menus = [
    {icon: 'home', name: 'Accueil', page: '/'},
    {icon: 'person', name: 'Mon compte', page: '/profil'},
    {icon: 'room', name: 'Les salles', page: '/rooms'},
    {icon: 'info', name: 'Informations', page: '/informations'}
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
