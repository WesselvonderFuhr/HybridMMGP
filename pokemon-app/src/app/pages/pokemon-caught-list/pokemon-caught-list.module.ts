import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonCaughtListPageRoutingModule } from './pokemon-caught-list-routing.module';

import { PokemonCaughtListPage } from './pokemon-caught-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonCaughtListPageRoutingModule
  ],
  declarations: [PokemonCaughtListPage]
})
export class PokemonCaughtListPageModule {}
