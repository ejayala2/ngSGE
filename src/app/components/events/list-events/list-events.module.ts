import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListEventsRoutingModule } from './list-events-routing.module';
import { ListEventsComponent } from './list-events.component';
import { MaterialModule } from '../../../material.module';
import { TableComponent } from '../../../shared/components/table/table.component';

@NgModule({
  declarations: [ListEventsComponent, TableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ListEventsRoutingModule
  ]
})
export class ListEventsModule { }
