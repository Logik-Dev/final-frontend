import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'final';
  showMenu = false;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (event.target.innerWidth > 480) {
      this.showMenu = false;
    }
  }

}
