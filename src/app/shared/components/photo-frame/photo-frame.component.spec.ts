import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LikeWidgetComponent } from '../like-widget/like-widget.component';

describe('PhotoFrameComponent', () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PhotoFrameComponent , LikeWidgetComponent],
      imports: [FontAwesomeModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) once when called multiple times within debounce time`, fakeAsync(() => {
    let times = 0
    component.liked.subscribe(() => {
      times++;
    });

    component.like();
    component.like();
    tick(500) // Espera 500ms para que o debounce seja acionado

    expect(times).toBe(1);
  }));

  it(`#${PhotoFrameComponent.prototype.like.name} should trigger (@Output liked) two times when called outside debounce time`, fakeAsync(() => {
    const DEBOUNCE_TIME: number = 500;
    let times: number = 0

    component.liked.subscribe(() => {
      times++;
    });

    component.like();
    tick(DEBOUNCE_TIME)
    component.like();
    tick(DEBOUNCE_TIME)

    expect(times).toBe(2);
  }));

  it(`Should display number of likes when (@Input likes) is incremented`, () => {
    component.likes++;
    fixture.detectChanges(); // Atualiza a visualização após a mudança de valor

    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
    // O fixture.nativeElement é o elemento DOM do componente
    // O querySelector é usado para selecionar o elemento DOM que contém o número de likes
    // O .like-counter é a classe CSS que foi adicionada ao elemento DOM no template do componente

    expect(element.textContent.trim()).toBe('1');
    // Verifica se o texto do elemento DOM é igual a 1
    // O trim() é usado para remover espaços em branco no início e no final do texto. Sem isso, o teste falharia. (Error: Expected ' 1 ' to be '1')
  });

  it(`Should update aria-label when (@Input likes is incremented)`, () => {
    component.likes++;
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('1: people liked');
    // .getAttribute() é usado para obter o valor de um atributo no elemento DOM. Nessa caso, estamos obtendo o valor do atributo aria-label
  });

  it(`Should have aria-label with default (@Input likes) value (0)`, () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.like-counter');

    expect(element.getAttribute('aria-label')).toBe('0: people liked');
  });
});
