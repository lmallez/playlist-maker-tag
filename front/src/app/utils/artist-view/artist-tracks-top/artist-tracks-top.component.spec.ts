import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistTracksTopComponent } from './artist-tracks-top.component';

describe('ArtistTracksTopComponent', () => {
  let component: ArtistTracksTopComponent;
  let fixture: ComponentFixture<ArtistTracksTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistTracksTopComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistTracksTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
