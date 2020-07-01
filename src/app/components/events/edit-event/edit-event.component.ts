import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventI } from '../../../shared/models/event.interface';
import { EventService } from '../event.service';
import { BeaconI } from 'src/app/shared/models/beacon.interface';
import { Observable } from 'rxjs';
import { BeaconService } from '../../beacons/beacon.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
  public salas$: Observable<BeaconI[]>;
  beacons: BeaconI[] = [];
  topicos = new FormControl('',Validators.required);
  //serializedDate = new FormControl((new Date()).toISOString());
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
  @Input() event: EventI;

  constructor(private eventSvc: EventService,  private beaconSvc: BeaconService) { }

  public editEventForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    siglas: new FormControl('', Validators.required),
    sala: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required),
    //dateselect: new FormControl({value:'', disabled: true}, Validators.required),
    dateselect: new FormControl('', Validators.required),
    topics: this.topicos,
  })
  ngOnInit() {
    this.initValuesForm();
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
            this.beacons.push(beaconObj as BeaconI);
        }
      )
    });
  }
  editEvent(event: EventI){
    this.eventSvc.saveEvent(event);
  }

  private initValuesForm():void{
    this.editEventForm.patchValue({
      id: this.event.id,
      title:this.event.title,
      siglas:this.event.siglas,
      sala: this.event.idsala,
      descrip:this.event.descrip,
      dateselect: this.formatDate(this.event.date),
      topics:this.event.topics
    })
  }

  formatDate(selectDate:String):Date{
    var splitted = selectDate.split("/");
    var newSelectDate = new Date();
    var mes = parseInt(splitted[0]);
    newSelectDate.setMonth(mes-1);
    newSelectDate.setDate(+splitted[1]);
    newSelectDate.setFullYear(+splitted[2]);

    return newSelectDate;
  }
}
