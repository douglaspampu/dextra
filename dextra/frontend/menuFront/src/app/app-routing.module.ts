import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { IngredientsComponent } from './components/ingredients/ingredients.component';

const routes: Routes = [
  {path: 'menu', component: MenuComponent},
  {path: 'ingredientes', component: IngredientsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
