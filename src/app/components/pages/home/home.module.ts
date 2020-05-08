import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../../material.module';
import { EventComponent } from './../../../components/events/event/event.component';

@NgModule({
  declarations: [HomeComponent, EventComponent],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
