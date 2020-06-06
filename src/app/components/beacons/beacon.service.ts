import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { BeaconI } from 'src/app/shared/models/beacon.interface';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class BeaconService {

  private beaconsCollection: AngularFirestoreCollection<BeaconI>;

  constructor(private afs: AngularFirestore) {
    this.beaconsCollection = afs.collection<BeaconI>('beacons');
  }
  public deleteBeaconById(beacon: BeaconI) {
    return this.beaconsCollection.doc(beacon.id).delete();
  }

  public getAllBeacons(): Observable<BeaconI[]> {
    return this.beaconsCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as BeaconI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      )
  }
  public getOneBeacon(id: BeaconI): Observable<BeaconI> {
    return this.afs.doc<BeaconI>(`beacons/${id}`).valueChanges();
  }
  public getBeacon(id: string): Observable<BeaconI> {
    return this.afs.doc<BeaconI>(`beacons/${id}`).valueChanges();
  }

  public editBeaconById(beacon: BeaconI) {
    return this.beaconsCollection.doc(beacon.id).update(beacon);
  }

  public getbeaconByname(name: string): void {
    this.afs.collection("beacons").ref.where("name", "==", name)
      .get()
      .then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
        });
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  public saveBeacon(beacon: BeaconI) {
    const beaconObj = {
      name: beacon.name,
      sala: beacon.sala,
      descrip: beacon.descrip
    };
    if (beacon.id) {
      return this.beaconsCollection.doc(beacon.id).update(beaconObj);
    } else {
      return this.beaconsCollection.add(beaconObj);
    }
  }

}
