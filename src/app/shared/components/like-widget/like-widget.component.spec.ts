import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { LikeWidgetComponent } from './like-widget.component';
import { LikeWidgetModule } from './like-widget.module';

describe(LikeWidgetComponent.name, () => {
  let fixture: ComponentFixture<LikeWidgetComponent> = null;
  let component: LikeWidgetComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeWidgetModule]
    }).compileComponents();

    fixture = TestBed.createComponent(LikeWidgetComponent);
    component = fixture.componentInstance;
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });

  it('Should auto-generate ID during ngOnInit when (@Input id) is not assigned', () => {
    fixture.detectChanges();
    expect(component.id).toBeTruthy();
  });

  it('Should NOT auto-generate ID during ngOnInit when (@Input id) is assigned', () => {
    const someId = 'someId';
    component.id = someId;
    fixture.detectChanges();
    expect(component.id).toBe(someId);
  });

  it(`#${LikeWidgetComponent.prototype.like.name}
    should trigger (@Output liked) when called`, () => {
      spyOn(component.liked, 'emit');
      fixture.detectChanges();
      component.like();
      expect(component.liked.emit).toHaveBeenCalled();
  });

  it(`(D) Should display display number of likes when clicked`, done => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges(); // Atualiza a visualização após a mudança de valor
      const likeCounterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(likeCounterEl.textContent.trim()).toBe('1');
      done();
    });

    const LikeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    LikeWidgetContainerEl.click(); // Para simula um eventos do DOM, é só chamar o evento como método.
  })

  it(`(D) Should display display number of likes when ENTER KEY is pressed`, done => {
    component.liked.subscribe(() => {
      component.likes++;
      fixture.detectChanges(); // Atualiza a visualização após a mudança de valor
      const likeCounterEl: HTMLElement = fixture.nativeElement.querySelector('.like-counter');
      expect(likeCounterEl.textContent.trim()).toBe('1');
      done();
    });

    const LikeWidgetContainerEl: HTMLElement = fixture.nativeElement.querySelector('.like-widget-container');
    const event = new KeyboardEvent('keyup', { key: 'Enter' }); // Cria um evento de teclado simulando a tecla ENTER
    LikeWidgetContainerEl.dispatchEvent(event) // Quando o evento não tem um método, usa-se o dispatchEvent para simular o evento do DOM. Seu parametro é o evento que queremos simular. No caso, o evento de teclado que criamos acima.
  })
});
