import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSubeventComponent } from './new-subevent.component';

describe('NewSubeventComponent', () => {
  let component: NewSubeventComponent;
  let fixture: ComponentFixture<NewSubeventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSubeventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSubeventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
