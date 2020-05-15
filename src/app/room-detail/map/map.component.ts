import {Component, Input, OnInit} from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  @Input() latitude;
  @Input() longitude;
  @Input() address;
  constructor() { }

  ngOnInit(): void {
    const map = L.map('map').setView([this.latitude, this.longitude], 15);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'Localisation'
    }).addTo(map);
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    L.marker([this.latitude, this.longitude], {icon: myIcon}).bindPopup(this.address).addTo(map).openPopup()
  }

}
