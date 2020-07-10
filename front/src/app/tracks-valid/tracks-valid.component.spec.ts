import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksValidComponent } from './tracks-valid.component';

describe('ValidTracksComponent', () => {
  let component: TracksValidComponent;
  let fixture: ComponentFixture<TracksValidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TracksValidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
