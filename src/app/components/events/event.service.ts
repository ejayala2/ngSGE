import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventI } from '../../shared/models/event.interface';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsCollection: AngularFirestoreCollection<EventI>;

  constructor(private afs: AngularFirestore) { 
    this.eventsCollection = afs.collection<EventI>('events');
  }

  public getAllEvents():Observable<EventI[]>{
    return this.eventsCollection
    .snapshotChanges()
    .pipe(
      map(actions =>
        actions.map(a=>{
          const data = a.payload.doc.data() as EventI;
          const id = a.payload.doc.id;
          return { id, ...data};
        })
        )
    )
  }

  public getOneEvent(id:EventI):Observable<EventI>{
    return this.afs.doc<EventI>(`events/${id}`).valueChanges();
  }

  public deleteEventById(event:EventI){
    return this.eventsCollection.doc(event.id).delete();
  }

  public editEventById(event:EventI){
    return this.eventsCollection.doc(event.id).update(event);
  }

  public saveEvent(event: EventI){
    const date =  this.formatDate(event.dateselect);
    console.log('ESTA ES LA CAMBIADA: ',date);
    const eventObj = {
      title: event.title,
      siglas: event.siglas,
      descrip: event.descrip,
      topics: event.topics,
      date: date,
      sala: event.sala
    };
    if (event.id){
      console.log('ENTRO A EDITAR');
      return this.eventsCollection.doc(event.id).update(eventObj);
    }else{
      return this.eventsCollection.add(eventObj);
    }
  }

  formatDate(date:Date):string{
    const day = date.getDate();
    const month = date.getMonth()+1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
