import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PhotoFrameComponent } from './photo-frame.component';

describe('PhotoFrameComponent', () => {
  let component: PhotoFrameComponent;
  let fixture: ComponentFixture<PhotoFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhotoFrameComponent ]
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
});
