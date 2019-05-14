import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumPhotosPage } from './album-photos.page';

describe('AlbumPhotosPage', () => {
  let component: AlbumPhotosPage;
  let fixture: ComponentFixture<AlbumPhotosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumPhotosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumPhotosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
