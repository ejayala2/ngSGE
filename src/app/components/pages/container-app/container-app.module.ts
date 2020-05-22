import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerAppComponent } from './container-app.component';
import { HomeComponent } from '../home/home.component';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../home/dashboard.service';


@NgModule({
  declarations: [
    ContainerAppComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers:[
    DashboardService
  ]
})
export class ContainerAppModule { }
