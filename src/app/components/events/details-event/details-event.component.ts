import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { EventI } from '../../../shared/models/event.interface';


@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  public event$: Observable<EventI>;

  constructor(private route: ActivatedRoute, private eventSvc: EventService) { }

  ngOnInit() {
    const idEvent = this.route.snapshot.params.id;
    this.event$ = this.eventSvc.getOneEvent(idEvent);
  }

}
