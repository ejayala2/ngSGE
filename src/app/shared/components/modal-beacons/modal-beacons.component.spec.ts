import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBeaconsComponent } from './modal-beacons.component';

describe('ModalBeaconsComponent', () => {
  let component: ModalBeaconsComponent;
  let fixture: ComponentFixture<ModalBeaconsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBeaconsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBeaconsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
