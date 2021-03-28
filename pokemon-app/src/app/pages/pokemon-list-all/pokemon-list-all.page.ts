import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';

@Component({
  selector: 'app-pokemon-list-all',
  templateUrl: './pokemon-list-all.page.html',
  styleUrls: ['./pokemon-list-all.page.scss'],
})
export class PokemonListAllPage implements OnInit {

  constructor(private pokemonService: PokemonService) { }

  ngOnInit() {
    this.pokemonService.getPokemons().subscribe((response: any) => {
      console.log(response);
    });
  }

}
