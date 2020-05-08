import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListEventsComponent } from './list-events.component';

const routes: Routes = [{ path: '', component: ListEventsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListEventsRoutingModule { }
