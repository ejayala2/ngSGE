import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListBeaconsRoutingModule } from './list-beacons-routing.module';
import { ListBeaconsComponent } from './list-beacons.component';
import { MaterialModule } from '../../../material.module';
import { TableBeaconsComponent } from '../../../shared/components/table-beacons/table-beacons.component';


@NgModule({
  declarations: [ListBeaconsComponent, TableBeaconsComponent],
  imports: [
    CommonModule,
    ListBeaconsRoutingModule,
    MaterialModule
  ]
})
export class ListBeaconsModule { }
