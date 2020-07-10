import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracksAddedComponent } from './artist-tracks-added.component';

describe('ArtistTracksComponent', () => {
  let component: ArtistTracksAddedComponent;
  let fixture: ComponentFixture<ArtistTracksAddedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistTracksAddedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTracksAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
