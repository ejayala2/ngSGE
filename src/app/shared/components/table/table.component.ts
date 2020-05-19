import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EventService } from '../../../components/events/event.service';
import { EventI } from '../../models/event.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './../modal/modal.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {
  public events$: Observable<EventI[]>;
  displayedColumns: string[] = ['title', 'siglas', 'descrip', 'topics', 'actions'];
  dataSource = new MatTableDataSource();
 
  @ViewChild(MatPaginator, {static:true})paginator:MatPaginator;
  @ViewChild(MatSort, {static: true})sort:MatSort;
  constructor(private eventSvc: EventService, public dialog:MatDialog) { }

  ngOnInit() {
    this.events$ = this.eventSvc.getAllEvents();
    this.events$
      .subscribe(events=> (this.dataSource.data = events));
  }

  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //EDITAR EVENTO
  onEditEvent(event:EventI){
    console.log('edit event', event);
    this.openDialog(event);
  }

  //ELIMINAR EVENTO
  onDeleteEvent(event:EventI){
    console.log('delete event', event);
    Swal.fire({
      title:'¿Estás seguro de eliminar este Evento?',
      text:'Luego de eliminar no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63244',
      cancelButtonColor: '#4f9ca5',
      confirmButtonText: 'Confirmar'
    }).then(result => {
      if(result.value){
        //Borrar
        this.eventSvc.deleteEventById(event).then(()=>{
          Swal.fire('Eliminado!', 'El evento ha sido eliminado con éxito.', 'success');
        }).catch((error)=> {
          Swal.fire('Error!', '¡Ha ocurrido un error al eliminar el evento!', 'error');
        });
      }
    })
  }
  onNewEvent(){
    this.openDialog();
  }

  openDialog(event?: EventI): void{
    const config = {
      data:{
        message: event ? 'Edit Event' : 'New Event',
        content: event
      }
    };
    
    const dialogRef = this.dialog.open(ModalComponent, config);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result ${result}`);
    });
  }
}
