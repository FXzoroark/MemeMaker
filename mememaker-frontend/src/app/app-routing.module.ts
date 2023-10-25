import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemesComponent } from './memes/memes.component';

const routes: Routes = [
  { path: '', redirectTo: 'memes', pathMatch: 'full' }, // Pour la future page d'acceuil 
  { path: 'memes', component: MemesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
