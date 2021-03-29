import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';

@Component({
  selector: 'app-pokemon-list-all',
  templateUrl: './pokemon-list-all.page.html',
  styleUrls: ['./pokemon-list-all.page.scss'],
})
export class PokemonListAllPage implements OnInit {

  pokemons : Pokemon[] = new Array();
  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      this.SetPokemons(response);
     
    });
  }

  SetPokemons(pokemonList){
    console.log(pokemonList);
    pokemonList.forEach(element => {
      this.pokemonService.getPokemon(element.id).subscribe(pokemon => this.pokemons.push(pokemon));
    });
  }

}
