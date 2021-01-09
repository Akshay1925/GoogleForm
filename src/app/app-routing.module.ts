import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleFormComponent } from './google-form/google-form.component';
import { PreviewComponent } from './preview/preview.component';

const routes: Routes = [
  { path: '', component: GoogleFormComponent },
  { path: 'preview', component: PreviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
