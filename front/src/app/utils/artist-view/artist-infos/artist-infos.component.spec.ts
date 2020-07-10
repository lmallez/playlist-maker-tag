import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistInfosComponent } from './artist-infos.component';

describe('ArtistInfosComponent', () => {
  let component: ArtistInfosComponent;
  let fixture: ComponentFixture<ArtistInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
