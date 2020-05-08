import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../../events/event.service';
import { EventI } from '../../../shared/models/event.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  //public events$: Observable<EventI[]>;
  @Input() event:EventI;
  constructor(private eventSvc: EventService) { }

  ngOnInit() {
    // this.eventSvc.getAllEvents().subscribe(res => console.log('EVENTOS', res));
    //this.events$ = this.eventSvc.getAllEvents();
  }
}
