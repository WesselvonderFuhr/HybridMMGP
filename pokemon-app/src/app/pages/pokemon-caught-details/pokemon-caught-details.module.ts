import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PokemonCaughtDetailsPageRoutingModule } from './pokemon-caught-details-routing.module';

import { PokemonCaughtDetailsPage } from './pokemon-caught-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PokemonCaughtDetailsPageRoutingModule
  ],
  declarations: [PokemonCaughtDetailsPage]
})
export class PokemonCaughtDetailsPageModule {}
