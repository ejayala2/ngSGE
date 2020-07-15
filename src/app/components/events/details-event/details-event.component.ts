import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { EventI } from '../../../shared/models/event.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../../../shared/components/modal/modal.component';
import Swal from 'sweetalert2';
import { BeaconService } from '../../beacons/beacon.service';
import { BeaconI } from 'src/app/shared/models/beacon.interface';

@Component({
  selector: 'app-details-event',
  templateUrl: './details-event.component.html',
  styleUrls: ['./details-event.component.scss']
})
export class DetailsEventComponent implements OnInit {
  public event$: Observable<EventI>;
  //public subids: Array<string>;
  public subevent$: Observable<EventI>;
  public subevents$: Observable<EventI[]>;
  public subeventList: EventI[] = [];
  public beacon$: Observable<BeaconI>;
  public subscriptionSub;
  public idEvent: any;
  displayedColumns: string[] = ['title', 'fecha', 'sala', 'actions'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private route: ActivatedRoute,  private beaconSvc: BeaconService, private eventSvc: EventService, public dialog: MatDialog) { }

  ngOnInit() {
    this.idEvent = this.route.snapshot.params.id;
    this.event$ = this.eventSvc.getOneEvent(this.idEvent);
    this.event$
      .subscribe(event => {
        console.log(event);
        if(event.idSubevents != 0){
          //console.log('entro aqui');
          event.id = this.idEvent;
          event.idSubevents.forEach(element =>{
            this.subevent$ = this.eventSvc.getOneSubEvent(element);
            const subscripSub = this.subevent$.subscribe(subevent => {
              //console.log('sala id antes de beacon: ', subevent.sala)
              var salaid= subevent.sala;
              this.beacon$ = this.beaconSvc.getBeacon(subevent.sala);
              const subscription = this.beacon$.subscribe(res =>{
                console.log('subevento: ', subevent);
                const subeventObj = {
                  id: subevent.id,
                  title: subevent.title,
                  siglas: subevent.siglas,
                  descrip: subevent.descrip,
                  topics: subevent.topics,
                  date: subevent.date,
                  idsala: subevent.sala,
                  sala: res.sala
                };
                this.subeventList.push(subeventObj as EventI);
                this.dataSource.data = this.subeventList;
                subscription.unsubscribe();
                subscripSub.unsubscribe();
              })
            })
          }); 
        }else{
          console.log("No subeventos");
        }
      })
  }
  

  onNewEvent() {
    this.subeventList = [];
    this.openDialog();
  }

  /*envia datos del evento master para guardar su referencia posteriormente*/
  onEditEvent(event: EventI) {
    this.subeventList = [];
    this.openDialog(event);
  }
  openDialog(event?: EventI): void {
    const config = {
      data: {
        message: event ? 'Crear Sub Evento' : 'Nuevo SubEvento',
        content: event,
        sub: 'true'
      }
    };
    //se agrega la variable sub para controlar que se ingresara un nuevo suevento.
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result ${result}`);
      this.subeventList = [];
    });
  }

    //ELIMINAR EVENTO
    onDeletesubEvent(subevent: EventI) {
      console.log('delete event', subevent);
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
          this.subeventList = [];
          this.eventSvc.deletesubEventById(this.idEvent, subevent).then(() => {
            Swal.fire('Eliminado!', 'El evento ha sido eliminado con éxito.', 'success');
          }).catch((error) => {
            Swal.fire('Error!', '¡Ha ocurrido un error al eliminar el evento!', 'error');
          });
        }
      })
    }
}
