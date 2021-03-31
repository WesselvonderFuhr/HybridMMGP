import { Component, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';
import {ActivatedRoute} from '@angular/router';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
  selector: 'app-pokemon-caught-details',
  templateUrl: './pokemon-caught-details.page.html',
  styleUrls: ['./pokemon-caught-details.page.scss'],
})
export class PokemonCaughtDetailsPage implements OnInit {
 


  pokemon: Pokemon;

  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService) { }

  ngOnInit(): void {
    // this.dataService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
    const id = +this.route.snapshot.paramMap.get('id');
    this.pokemonService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
   this.clear();
  }
  async clear() {
    await Storage.clear();
  }
  async keys() {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);
  }
// JSON "set" example
async setObject(keyname) {
  await Storage.set({
    key: keyname,
    value: JSON.stringify({
      id: 1,
      name: 'Max'
    })
  });
}

// JSON "get" example
async getObject() {
  const ret = await Storage.get({ key: 'user' });
  const user = JSON.parse(ret.value);
}



}


