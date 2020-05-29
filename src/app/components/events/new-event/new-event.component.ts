import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventI } from '../../../shared/models/event.interface';
import { EventService } from '../event.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  constructor(private eventSvc: EventService) { }
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
    idsala: new FormControl('', Validators.required),
    topics: this.topicos
  })
  ngOnInit() {
  }
  addNewEvent(data: EventI){
    console.log('Nuevo evento', data);
    this.eventSvc.saveEvent(data);
  }

}
