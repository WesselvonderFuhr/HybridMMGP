import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonCaughtListPage } from './pokemon-caught-list.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonCaughtListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonCaughtListPageRoutingModule {}
