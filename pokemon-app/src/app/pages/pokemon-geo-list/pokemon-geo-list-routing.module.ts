import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonGeoListPage } from './pokemon-geo-list.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonGeoListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonGeoListPageRoutingModule {}
