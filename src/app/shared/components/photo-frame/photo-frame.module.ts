import { CommonModule } from '@angular/common';
import { LikeWidgetComponent } from '../like-widget/like-widget.component';
import { PhotoFrameComponent } from './photo-frame.component';
import { NgModule } from '@angular/core';
import { LikeWidgetModule } from '../like-widget/like-widget.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LikeWidgetModule
  ],
  exports: [],
})
export class PhotoFrameModule {}
