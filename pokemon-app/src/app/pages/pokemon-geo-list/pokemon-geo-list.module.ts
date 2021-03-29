import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonGeoListPageRoutingModule } from './pokemon-geo-list-routing.module';

import { PokemonGeoListPage } from './pokemon-geo-list.page';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonGeoListPageRoutingModule
  ],

  declarations: [PokemonGeoListPage]
})
export class PokemonGeoListPageModule {}
