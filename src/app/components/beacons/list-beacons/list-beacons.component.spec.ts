import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBeaconsComponent } from './list-beacons.component';

describe('ListBeaconsComponent', () => {
  let component: ListBeaconsComponent;
  let fixture: ComponentFixture<ListBeaconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListBeaconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
