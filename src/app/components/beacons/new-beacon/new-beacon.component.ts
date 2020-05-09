import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BeaconI } from '../../../shared/models/beacon.interface';
import { BeaconService } from '../beacon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-beacon',
  templateUrl: './new-beacon.component.html',
  styleUrls: ['./new-beacon.component.scss']
})
export class NewBeaconComponent implements OnInit {

  constructor(private beaconSvc: BeaconService) { }

  public newBeaconForm =new FormGroup({
    name: new FormControl('', Validators.required),
    sala: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required)
  })
  ngOnInit() {
  }
  addNewBeacon(data: BeaconI){
    console.log('Nuevo beacon', data);
    this.beaconSvc.saveBeacon(data);
    Swal.fire({
      icon: 'success',
      title: 'Se ha registrado el beacon de forma exitosa',
      showConfirmButton: false,
      timer: 1500
    })
  }

}
