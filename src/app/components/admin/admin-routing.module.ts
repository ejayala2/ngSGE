import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProfileModule } from './profile/profile.module';
import { AuthGuard } from './../../shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: AdminComponent,
    canActivate: [AuthGuard], 
    children:[
      {
        path: 'events',
        loadChildren: ()=>
          import('../events/list-events/list-events.module').then(
            m=> m.ListEventsModule
          )
      },
      {
        path: 'profile',
        loadChildren: ()=>
          import('./profile/profile.module').then(
            m=> ProfileModule
          )
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
