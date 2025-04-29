import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { PhotoBoardService } from 'src/app/shared/components/photo-board/services/photo-board.service';
import { PhotoListComponent } from './photo-list.component';
import { PhotoListModule } from './photo-list.module';
import { buildPhotoList } from 'src/app/shared/components/photo-board/test/build-photo-list';

describe(PhotoListComponent.name, () => {
  let fixture: ComponentFixture<PhotoListComponent>;
  let component: PhotoListComponent;
  let mockPhotoBoardService: jasmine.SpyObj<PhotoBoardService> = jasmine.createSpyObj('PhotoBoardService', ['getPhotos']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PhotoListModule,
        HttpClientModule
      ],
      providers: [
        { provide: PhotoBoardService, useValue: mockPhotoBoardService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PhotoListComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it(`(D) Should display board when data arrives`, () => {
    const photos = buildPhotoList();
    mockPhotoBoardService.getPhotos.and.returnValue(of(photos));
    //spyOn(service, 'getPhotos').and.returnValue(of(photos)); // Caso tivessemos utilizado  serviço em sua forma real.

    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should dislay board').not.toBeNull(); // verifica se o elemento existe
    expect(loader).withContext('Should not display loader').toBeNull(); // verifica se o elemento não existe
  });

  it(`(D) Should display loader while waiting for data`, () => {
    const photos = buildPhotoList();
    mockPhotoBoardService.getPhotos.and.returnValue(null);

    fixture.detectChanges();

    const board = fixture.nativeElement.querySelector('app-photo-board');
    const loader = fixture.nativeElement.querySelector('.loader');

    expect(board).withContext('Should not display board').toBeNull(); // Se o board não existe, o loader deve existir
    expect(loader).withContext('Should display loader').not.toBeNull();
  });
});
