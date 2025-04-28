import { Action } from 'rxjs/internal/scheduler/Action';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActionDirective } from './action.directive';
import { ActionDirectiveModule } from './action.module';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(ActionDirective.name, () => {
  let fixture: ComponentFixture<ActionDirectiveTestComponent> = null;
  let component: ActionDirectiveTestComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActionDirectiveTestComponent],
      imports: [ActionDirectiveModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ActionDirectiveTestComponent);
    component = fixture.componentInstance;
  })

  it(`(D) (@Output appAction) should emit event with payload when ENTER key is pressed`, () => {
    const divEl: HTMLElement = fixture.debugElement.query(By.directive(ActionDirective)).nativeElement
    const event: KeyboardEvent = new KeyboardEvent('keyup', { key: 'Enter' });
    divEl.dispatchEvent(event)

    expect(component.hasEvent()).toBeTrue
  })

  it(`(D) (@Output appAction) should emit event with payload when clicked`, () => {
    const divEl: HTMLElement = fixture.nativeElement.querySelector('.dummy-component');
    divEl.click()

    expect(component.hasEvent()).toBeTrue;
  })

});
@Component({
  template: `<div class="dummy-component" (appAction)="actionHandler($event)"></div>`
})
class ActionDirectiveTestComponent {
  private event!: Event;

  actionHandler(event: Event): void {
    this.event = event;
  }

  hasEvent(): boolean {
    return !!this.event;
  }
}
