import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTracksComponent } from './tag-tracks.component';

describe('TagTracksComponent', () => {
  let component: TagTracksComponent;
  let fixture: ComponentFixture<TagTracksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTracksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTracksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
