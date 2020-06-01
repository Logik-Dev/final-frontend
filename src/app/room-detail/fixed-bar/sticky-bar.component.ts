import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Room} from '../../../models/room';

@Component({
  selector: 'app-sticky-bar',
  templateUrl: './sticky-bar.component.html',
  styleUrls: ['./sticky-bar.component.scss']
})
export class StickyBarComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef: TemplateRef<any>;
  @Input() room: Room;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Ouvrir la dialog réservation
   */
  openDialog(): void {
    this.dialog.open(this.dialogRef, {
      panelClass: 'booking-dialog'
    });
  }

  /**
   * Fermer la dialog
   */
  closeDialog(): void {
    this.dialog.closeAll();
  }
}
