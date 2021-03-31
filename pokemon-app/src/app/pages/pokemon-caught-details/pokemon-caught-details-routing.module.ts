import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonCaughtDetailsPage } from './pokemon-caught-details.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonCaughtDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonCaughtDetailsPageRoutingModule {}
