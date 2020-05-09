import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-beacons',
  templateUrl: './modal-beacons.component.html',
  styleUrls: ['./modal-beacons.component.scss']
})
export class ModalBeaconsComponent implements OnInit {

  constructor(public dialog: MatDialogRef<ModalBeaconsComponent>,
    //tslint:disable-next-line: align
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
