import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './../../../shared/guards/auth.guard';
import { ContainerAppComponent } from './container-app.component';

const routes: Routes = [
  { path: '', component: ContainerAppComponent,
    canActivate: [AuthGuard], 
    children:[
      {
        path:'', redirectTo:'/', pathMatch: 'full'
      },
      {
        path: 'events',
        loadChildren: ()=>
          import('../../events/list-events/list-events.module').then(
            m=> m.ListEventsModule
          )
      },
      { 
        path: 'beacons', 
        loadChildren: () => 
          import('../../beacons/list-beacons/list-beacons.module').then(
            m => m.ListBeaconsModule) 
      }
    ]
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  exports: [RouterModule]
})
export class ContainerAppRoutingModule { }
