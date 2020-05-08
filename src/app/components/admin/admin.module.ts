import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/app/material.module';


@NgModule({
  declarations: [AdminComponent],
  imports: [
    MaterialModule,
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
