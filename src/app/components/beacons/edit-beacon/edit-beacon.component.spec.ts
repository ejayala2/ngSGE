import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBeaconComponent } from './edit-beacon.component';

describe('EditBeaconComponent', () => {
  let component: EditBeaconComponent;
  let fixture: ComponentFixture<EditBeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
