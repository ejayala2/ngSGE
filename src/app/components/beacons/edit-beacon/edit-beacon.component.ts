import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BeaconI } from '../../../shared/models/beacon.interface';
import { BeaconService } from '../beacon.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-beacon',
  templateUrl: './edit-beacon.component.html',
  styleUrls: ['./edit-beacon.component.scss']
})
export class EditBeaconComponent implements OnInit {
  
  @Input() beacon: BeaconI;
  constructor(private beaconSvc: BeaconService) { }

  public editBeaconForm = new FormGroup({
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    sala: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required),
  })
  ngOnInit() {
    this.initValuesForm();
  }
  editBeacon(beacon: BeaconI){
    this.beaconSvc.editBeaconById(beacon);
    Swal.fire({
      icon: 'success',
      title: 'Los cambios se han guardado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
  }

  private initValuesForm():void{
    this.editBeaconForm.patchValue({
      id: this.beacon.id,
      name:this.beacon.name,
      sala:this.beacon.sala,
      descrip:this.beacon.descrip
    })
  }

}
