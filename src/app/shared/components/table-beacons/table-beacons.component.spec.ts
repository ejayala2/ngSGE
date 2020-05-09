import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBeaconsComponent } from './table-beacons.component';

describe('TableBeaconsComponent', () => {
  let component: TableBeaconsComponent;
  let fixture: ComponentFixture<TableBeaconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBeaconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
