import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { MaterialModule } from '../../../material.module';
import { EventComponent } from './../../../components/events/event/event.component';
import { CardComponent } from 'src/app/shared/widgets/card/card.component';
import { PieComponent } from 'src/app/shared/widgets/pie/pie.component';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    HomeComponent, 
    EventComponent,
    CardComponent,
    PieComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HomeRoutingModule,
    HighchartsChartModule,
  ]
})
export class HomeModule { }
