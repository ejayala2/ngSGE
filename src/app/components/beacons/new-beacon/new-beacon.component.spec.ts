import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBeaconComponent } from './new-beacon.component';

describe('NewBeaconComponent', () => {
  let component: NewBeaconComponent;
  let fixture: ComponentFixture<NewBeaconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBeaconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBeaconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
