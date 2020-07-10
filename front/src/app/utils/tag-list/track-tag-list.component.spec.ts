import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackTagListComponent } from './track-tag-list.component';

describe('TagListComponent', () => {
  let component: TrackTagListComponent;
  let fixture: ComponentFixture<TrackTagListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackTagListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackTagListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
