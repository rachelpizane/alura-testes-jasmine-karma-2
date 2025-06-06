import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-photo-frame',
  templateUrl: './photo-frame.component.html',
  styleUrls: ['./photo-frame.component.scss']
})
export class PhotoFrameComponent implements OnInit, OnDestroy {
  @Output() liked: EventEmitter<void> = new EventEmitter<void>();
  @Input() description: string = '';
  @Input() imageUrl: string = '';
  @Input() likes: number = 0;

  private debounceSubject: Subject<void> = new Subject<void>();
  private unsubscribe: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.debounceSubject
    .asObservable()
    .pipe(debounceTime(500))
    .pipe(takeUntil(this.unsubscribe))
    .subscribe(() => this.liked.emit());
  }

  like(): void {
    this.debounceSubject.next();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

}


