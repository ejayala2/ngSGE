import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EventI } from '../../../shared/models/event.interface';
import { EventService } from './../../events/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public events$: Observable<EventI[]>;

  constructor(private eventSvc: EventService){}
  ngOnInit() {
    this.events$ = this.eventSvc.getAllEvents();
  }

}
