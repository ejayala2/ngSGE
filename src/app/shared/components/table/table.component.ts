import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
//event
import { EventService } from '../../../components/events/event.service';
import { EventI } from '../../models/event.interface';
//beacon 
import { BeaconService } from '../../../components/beacons/beacon.service';
import { BeaconI } from '../../models/beacon.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  public events$: Observable<EventI[]>;
  public eventList: EventI[] = [];
  public eventObj: EventI;
  public beacon$: Observable<BeaconI>;

  displayedColumns: string[] = ['title', 'siglas', 'fecha', 'sala', 'topics', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private eventSvc: EventService, private beaconSvc: BeaconService, public dialog: MatDialog) { }

  ngOnInit() {
    /*this.events$ = this.eventSvc.getAllEvents();
    this.events$
      .subscribe(events=> (this.dataSource.data = events));*/
    this.events$ = this.eventSvc.getAllEvents();
    this.events$
      .subscribe(events => {
        events.forEach(element => {
          this.beacon$ = this.beaconSvc.getBeacon(element.sala);
          const subscription = this.beacon$.subscribe(res => {
            const eventObj = {
              id: element.id,
              title: element.title,
              siglas: element.siglas,
              descrip: element.descrip,
              topics: element.topics,
              date: element.date,
              idsala: element.sala,
              sala: res.sala
            };
            this.eventList.push(eventObj as EventI);
            this.dataSource.data = this.eventList;
            subscription.unsubscribe();
          })
        })
      })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //EDITAR EVENTO
  onEditEvent(event: EventI) {
    console.log('edit event', event);
    this.eventList = [];
    this.openDialog(event);
  }

  //ELIMINAR EVENTO
  onDeleteEvent(event: EventI) {
    console.log('delete event', event);
    Swal.fire({
      title: '¿Estás seguro de eliminar este Evento?',
      text: 'Luego de eliminar no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63244',
      cancelButtonColor: '#4f9ca5',
      confirmButtonText: 'Confirmar'
    }).then(result => {
      if (result.value) {
        //Borrar
        this.eventList = [];
        this.eventSvc.deleteEventById(event).then(() => {
          Swal.fire('Eliminado!', 'El evento ha sido eliminado con éxito.', 'success');
        }).catch((error) => {
          Swal.fire('Error!', '¡Ha ocurrido un error al eliminar el evento!', 'error');
        });
      }
    })
  }
  onNewEvent() {
    this.eventList = [];
    this.openDialog();
  }

  openDialog(event?: EventI): void {
    const config = {
      data: {
        message: event ? 'Edit Event' : 'New Event',
        content: event
      }
    };
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
      this.eventList = [];
    });
  }
}
