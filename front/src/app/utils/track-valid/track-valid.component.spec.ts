import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackValidComponent } from './track-valid.component';

describe('TrackValidComponent', () => {
  let component: TrackValidComponent;
  let fixture: ComponentFixture<TrackValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
