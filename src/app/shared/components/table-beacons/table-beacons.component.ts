import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BeaconService } from '../../../components/beacons/beacon.service';
import { BeaconI } from '../../models/beacon.interface';
import Swal from 'sweetalert2';
import { MatDialog } from '@angular/material/dialog';
import { ModalBeaconsComponent } from './../modal-beacons/modal-beacons.component';

@Component({
  selector: 'app-table-beacons',
  templateUrl: './table-beacons.component.html',
  styleUrls: ['./table-beacons.component.scss']
})
export class TableBeaconsComponent implements OnInit {
  displayedColumns: string[] = ['name', 'sala', 'descrip', 'actions'];
  dataSource = new MatTableDataSource();
 
  @ViewChild(MatPaginator, {static:true})paginator:MatPaginator;
  @ViewChild(MatSort, {static: true})sort:MatSort;

  constructor(private beaconSvc: BeaconService, public dialog:MatDialog) { }

  ngOnInit() {
    this.beaconSvc
      .getAllBeacons()
      .subscribe(beacons=> (this.dataSource.data = beacons));
  }
  ngAfterViewInit(){
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(beacon: Event) {
    const filterValue = (beacon.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  //EDITAR BeaconO
  onEditBeacon(beacon:BeaconI){
    console.log('edit beacon', beacon);
    this.openDialog(beacon);
  }

  //ELIMINAR Beacon
  onDeleteBeacon(beacon:BeaconI){
    console.log('delete beacon', beacon);
    Swal.fire({
      title:'¿Estás seguro de eliminar este Beacon?',
      text:'Luego de eliminar no se podra revertir!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e63244',
      cancelButtonColor: '#4f9ca5',
      confirmButtonText: 'Confirmar'
    }).then(result => {
      if(result.value){
        //Borrar
        this.beaconSvc.deleteBeaconById(beacon).then(()=>{
          Swal.fire('Eliminado!', 'El beacon ha sido eliminado con éxito.', 'success');
        }).catch((error)=> {
          Swal.fire('Error!', '¡Ha ocurrido un error al eliminar el beacon!', 'error');
        });
      }
    })
  }
  onNewBeacon(){
    this.openDialog();
  }

  openDialog(beacon?: BeaconI): void{
    const config = {
      data:{
        message: beacon ? 'Edit Beacon' : 'New Beacon',
        content: beacon
      }
    };
    
    const dialogRef = this.dialog.open(ModalBeaconsComponent, config);
    dialogRef.afterClosed().subscribe(result=>{
      console.log(`Dialog result ${result}`);
    });
  }
  
}
