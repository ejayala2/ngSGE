import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewEventComponent } from './components/events/new-event/new-event.component';
import { NewEventModule } from './components/events/new-event/new-event.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
//toolbar
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
//Firebase
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule, StorageBucket } from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
//FORMS
import { ReactiveFormsModule } from '@angular/forms'; 
import { from } from 'rxjs';
import { ContainerAppComponent } from './components/pages/container-app/container-app.component';
import { ModalComponent } from './shared/components/modal/modal.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { EditEventModule } from './components/events/edit-event/edit-event.module';
import { DetailsEventComponent } from './components/events/details-event/details-event.component';

@NgModule({
  declarations: [
    AppComponent,
    NewEventComponent,
    ToolbarComponent,
    ContainerAppComponent,
    ModalComponent,
    EditEventComponent,
    DetailsEventComponent
  ],
  imports: [
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NewEventModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MaterialModule,
    EditEventModule
  ],
  entryComponents:[
    ModalComponent
  ],
  providers: [
    {provide: StorageBucket, useValue:'gs://sge-app-cfb10.appspot.com'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
