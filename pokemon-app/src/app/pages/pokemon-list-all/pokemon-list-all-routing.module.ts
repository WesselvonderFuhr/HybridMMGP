import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonListAllPage } from './pokemon-list-all.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonListAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonListAllPageRoutingModule {}
