import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonListAllPageRoutingModule } from './pokemon-list-all-routing.module';

import { PokemonListAllPage } from './pokemon-list-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonListAllPageRoutingModule
  ],
  declarations: [PokemonListAllPage]
})
export class PokemonListAllPageModule {}
