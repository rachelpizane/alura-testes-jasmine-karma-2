
import { Component, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Photo } from './interfaces/photo';
import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardmodule } from './photo-board.module';

function buildPhotoList(): Photo[] {
  const photos: Photo[] = [];
  const lengthPhotos = 8
  for (let i = 0; i < lengthPhotos; i++) {
    photos.push({
      id: i + 1,
      url: '',
      description: ''
    });
  }
  return photos;
}

describe(PhotoBoardComponent.name + ' outros', () => {
  let fixture: ComponentFixture<PhotoBoardComponent>;
  let component: PhotoBoardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoBoardComponent],
      imports: [PhotoBoardmodule]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it(`Should display rows and columns when (@Input photos) has value`, () => {
    component.photos = buildPhotoList();

    const changeMock: SimpleChanges = {
      photos: new SimpleChange(null, component.photos, true)
    };

    component.ngOnChanges(changeMock);

    fixture.detectChanges();
    expect(component.rows.length)
      .withContext('Number of rows')
      .toBe(2);
    expect(component.rows[0].length)
      .withContext('Number of columns from the first row')
      .toBe(4);
    expect(component.rows[1].length)
      .withContext('Number of columns from the second row')
      .toBe(4);
  });
});
