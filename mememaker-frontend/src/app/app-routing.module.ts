import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemesComponent } from './memes/memes.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', redirectTo: 'memes', pathMatch: 'full' }, // Pour la future page d'acceuil 
  { path: 'memes', component: MemesComponent },
  { path: 'edit/:id', component: UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
