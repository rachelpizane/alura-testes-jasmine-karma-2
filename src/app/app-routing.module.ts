import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './container/photo-list/photo-list.component';

const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: '**', redirectTo: 'photos' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
