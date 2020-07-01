import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  MatCardModule,
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatInputModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatSelectModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule 
} from '@angular/material';

const myModule= [
  MatCardModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatDialogModule,
  MatButtonModule,
  MatMenuModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatToolbarModule,
  MatIconModule,
  MatPaginatorModule,
  MatSidenavModule,
  MatInputModule,
  MatFormFieldModule,
  MatDividerModule,
  MatChipsModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatFormFieldModule
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    myModule
  ],
  exports: [
    myModule
  ]
})
export class MaterialModule { }
