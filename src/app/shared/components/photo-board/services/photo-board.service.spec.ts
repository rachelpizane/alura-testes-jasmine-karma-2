import { TestBed } from '@angular/core/testing';
import { PhotoBoardService } from './photo-board.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { buildPhotoList } from '../test/build-photo-list';

describe(PhotoBoardService.name, () => {
  let service: PhotoBoardService;
  let httpController: HttpTestingController
  // Para utilizar o HttpClientTestingModule, é necessário criar um HttpTestingController para simular as requisições HTTP.
  // O HttpTestingController é uma classe que permite simular requisições HTTP e verificar se elas foram feitas corretamente.

  const mockData = {
    api: 'http://localhost:3000/photos',
    data: buildPhotoList(),
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Vai sobrescrever o HttpClient
      providers: [PhotoBoardService],
    });

    service = TestBed.inject(PhotoBoardService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {httpController.verify()}); // Verifica se não há requisições pendentes após cada teste. Isso é importante para garantir que todos os testes não deixem requisições pendentes.

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${PhotoBoardService.prototype.getPhotos.name} should return photos with description in uppercase`,() => {
    service.getPhotos().subscribe((photos) => {
      expect(photos[0].description).toBe("EXAMPLE DESCRIPTION 1");
      expect(photos[1].description).toBe("EXAMPLE DESCRIPTION 2")
      expect(photos[photos.length - 1 ].description).toBe("EXAMPLE DESCRIPTION 8");
    });

    //httpController.expectOne(mockData.api).flush(mockData.data);
    // Simula a resposta da requisição HTTP
    // expectOne(): Verifica se a requisição foi feita para a URL correta
    // flush(): Simula a resposta da requisição HTTP, passando os dados que queremos retornar.
  })
});
