import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventI } from '../../../shared/models/event.interface';
import { EventService } from '../event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit {
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
  @Input() event: EventI;
  constructor(private eventSvc: EventService) { }

  public editEventForm = new FormGroup({
    id: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    siglas: new FormControl('', Validators.required),
    descrip: new FormControl('', Validators.required),
    topics: this.topicos,

  })
  ngOnInit() {
    this.initValuesForm();
  }
  editEvent(event: EventI){
    this.eventSvc.editEventById(event);
  }

  private initValuesForm():void{
    this.editEventForm.patchValue({
      id: this.event.id,
      title:this.event.title,
      siglas:this.event.siglas,
      descrip:this.event.descrip,
      topics:this.event.topics
    })
  }
}
