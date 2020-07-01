import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { EventI } from '../../../shared/models/event.interface';
import { EventService } from '../event.service';
import { BeaconService } from '../../beacons/beacon.service';
import { Observable } from 'rxjs';
import { BeaconI } from 'src/app/shared/models/beacon.interface';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  public salas$: Observable<BeaconI[]>;
  beaconControl = new FormControl('', Validators.required);
  Listbeacons: BeaconI[] = [];
  constructor(private eventSvc: EventService, private beaconSvc: BeaconService) { }
  
  topicos = new FormControl('',Validators.required);
  topicosList: string[] = [
    'Animación y simulación', 
    'Segmentación y agrupación en imágenes y videos', 
    'Codificación, compresión y transmisión de imágenes/videos',
    'Captura, edición y síntesis de movimiento', 
    'Realismo y síntesis de imágenes', 
    'Técnicas y algoritmos de rendering',
    'Hardware para computación gráfica',
    'Realidad virtual, aumentada y mixta',
    'Interfaces para realidad virtual',
    'Procesamiento de imágenes y videos',
    'Detección y reconocimiento de características'
  ];
  
  public newEventForm =new FormGroup({
    title: new FormControl('', Validators.required),
    siglas: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required),
    sala: new FormControl('', Validators.required),
    dateselect: new FormControl('', Validators.required),
    topics: this.topicos
  })


  ngOnInit() {
    this.Listbeacons = [];
    this.getsalas();
  }

  addNewEvent(data: EventI){
    console.log('Nuevo evento', data);
    this.eventSvc.saveEvent(data);
  }

  public getsalas(){
    this.salas$ = this.beaconSvc.getAllBeacons();
    this.salas$
      .subscribe(beacon => {
        beacon.forEach(element => {
            const beaconObj = {
              id: element.id,
              name: element.name,
              sala: element.sala,
              descrip: element.descrip
            };
            this.Listbeacons.push(beaconObj as BeaconI);
        }
      )
    });
  }
  resetForm(newEventForm: NgForm){
    if(newEventForm != null)
      newEventForm.reset();
  }
}
