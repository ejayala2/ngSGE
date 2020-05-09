import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';
import { BeaconComponent } from './components/beacons/beacon/beacon.component';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./components/auth/login/login.module').then(m => m.LoginModule) },
  { path:'', component:ContainerAppComponent,
    canActivate: [AuthGuard],  
    children:[
      { path: 'home', loadChildren: () => import('./components/pages/home/home.module').then(m => m.HomeModule) }, 
      { path: 'event/:id', component: DetailsEventComponent },
      { path: 'beacon/:id', component: BeaconComponent},
      { path: 'about', loadChildren: () => import('./components/pages/about/about.module').then(m => m.AboutModule) },
      { 
        path: '',
        redirectTo:'home',
        pathMatch: 'full'
      }
    ]
  },
  { path: 'admin', loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
