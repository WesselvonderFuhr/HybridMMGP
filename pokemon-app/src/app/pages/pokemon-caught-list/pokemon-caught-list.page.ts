import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import {PokemonStorage} from '../../models/pokemon-storage';
import {PokemonList} from '../../models/pokemon-list';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;


@Component({
  selector: 'app-pokemon-caught-list',
  templateUrl: './pokemon-caught-list.page.html',
  styleUrls: ['./pokemon-caught-list.page.scss'],
})
export class PokemonCaughtListPage implements OnInit {

  pokemons : PokemonStorage[] = new Array()
  constructor(private pokemonService: PokemonService) { }

   ngOnInit() {
    this.getPokemonFromStorage(this.SetPokemons,this);
  }

   async getPokemonFromStorage(_callback, classThis) {
    
    let {keys} = await Storage.keys();
    keys.forEach(item =>{
      
      this.getItemWithKey(item,_callback,classThis);
    });   
  }

  async getItemWithKey(key, _callback,classThis){
    let pokemon = new Array();
    let ret =  await Storage.get({ key: key });
    let json = JSON.parse(ret.value);
    
    pokemon.push(new PokemonStorage(null,json.pokemon_id,parseInt(key),json.name,json.description));
    console.log(pokemon);
    _callback(pokemon,classThis)
  }


  SetPokemons(pokemons,classThis){
      pokemons.forEach(element => {
        classThis.pokemonService.getPokemon(element.pokemon_id).subscribe(pokemon => {
          element.pokemon = pokemon
          classThis.pokemons.push(element);
        })
      });
  }
}
