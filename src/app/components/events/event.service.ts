import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventI } from '../../shared/models/event.interface';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsCollection: AngularFirestoreCollection<EventI>;
  private subeventsCollection: AngularFirestoreCollection<EventI>;

  constructor(private afs: AngularFirestore) {
    this.eventsCollection = afs.collection<EventI>('events');
    this.subeventsCollection = afs.collection<EventI>('subevents');
  }

  public getAllEvents(): Observable<EventI[]> {
    return this.eventsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as EventI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
  }

  public getOneEvent(id: EventI): Observable<EventI> {
    return this.afs.doc<EventI>(`events/${id}`).valueChanges();
  }

  public getOneSubEvent(id: string): Observable<EventI> {
    return this.afs.doc<EventI>(`subevents/${id}`).valueChanges();
  }

  public deleteEventById(event: EventI) {
    return this.eventsCollection.doc(event.id).delete();
  }
  //borra un subevento
  public deletesubEventById(eventid: string, subevent: EventI) {
    const val =  this.subeventsCollection.doc(subevent.id).delete();
    console.log(subevent.id);
    const eventRef = this.afs.collection("events").doc(eventid);
    //Elimina la refrencia del subevento en el evento master
    eventRef.update({
      idSubevents: firebase.firestore.FieldValue.arrayRemove(subevent.id)
    });
    return val;
  }

  public editEventById(event: EventI) {
    return this.eventsCollection.doc(event.id).update(event);
  }

  public saveEvent(event: EventI) {
    const date = this.formatDate(event.dateselect);
    const eventObj = {
      title: event.title,
      siglas: event.siglas,
      descrip: event.descrip,
      topics: event.topics,
      date: date,
      sala: event.sala
    };
    if (event.id) {
      console.log('ENTRO A EDITAR');
      return this.eventsCollection.doc(event.id).update(eventObj);
    } else {
      //Add cocument without id
      var newEv = this.eventsCollection.add(eventObj);
      //set id document with data 
      newEv.then(res =>{
        this.eventsCollection.doc(res.id).set({
          id: res.id,
          title: event.title,
          siglas: event.siglas,
          descrip: event.descrip,
          topics: event.topics,
          date: date,
          sala: event.sala
        })
      })
      return newEv;
    }
  }

  public async saveSubEvent(subevent: EventI, event: EventI) {
    var idsub: string;
    const date = this.formatDate(subevent.dateselect);
    const SubeventObj = {
      title: subevent.title,
      siglas: subevent.siglas,
      descrip: subevent.descrip,
      topics: subevent.topics,
      date: date,
      sala: subevent.sala
    };
    if (subevent.id) {
      console.log('ENTRO A EDITAR SUBEVENTO');
      return this.subeventsCollection.doc(subevent.id).update(SubeventObj);
    } else {
      var valor = this.subeventsCollection.add(SubeventObj)
        .then(function (docRef) {
          idsub = docRef.id.toString();
          docRef.set({
            id: idsub,
            title: subevent.title,
            siglas: subevent.siglas,
            descrip: subevent.descrip,
            topics: subevent.topics,
            date: date,
            sala: subevent.sala
          });
        })
        .catch(function (error) {
          console.error("Error al añadir al nuevo evento: ", error);
        });
      //Obtiene la data de la promesa (idsub)
      valor.then((res) => {
        const eventRef = this.afs.collection("events").doc(event.id);
        // Agrega automaticamente la referencia de un subevento en el evento master.
        eventRef.update({
          idSubevents: firebase.firestore.FieldValue.arrayUnion(idsub)
        });
      });
      return valor;
    }

  }

  formatDate(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
