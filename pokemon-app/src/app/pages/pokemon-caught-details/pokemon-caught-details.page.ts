import { Component, Directive, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';
import {ActivatedRoute} from '@angular/router';
import { Plugins } from '@capacitor/core';
import { PokemonStorage } from 'src/app/models/pokemon-storage';

const { Storage } = Plugins;


@Component({
  selector: 'app-pokemon-caught-details',
  templateUrl: './pokemon-caught-details.page.html',
  styleUrls: ['./pokemon-caught-details.page.scss'],
})
export class PokemonCaughtDetailsPage implements OnInit {
  name: String;
  description: String;
  pokemon: PokemonStorage ;

  constructor(private route: ActivatedRoute,
    private pokemonService: PokemonService) {
      this.pokemon = new PokemonStorage(null,0,0,'','');
   
     }
    
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.setPokemonObject(id,this.getPokemonWithid,this);
  }

  SaveInfo(){
    this.pokemon.name = this.name;
    this.pokemon.description = this.description;
    Storage.set({
      key: this.pokemon.id.toString(),
      value: JSON.stringify({
        pokemon_id:  this.pokemon.pokemon.id,
        pokemon_name:  this.pokemon.pokemon.name,
        name: this.pokemon.name,
        description: this.pokemon.description
      })
    });
   
  }
  async setPokemonObject(key,_callback,classThis) {
    let ret = await Storage.get({ key: key});
    let json = JSON.parse(ret.value);
    console.log(json);
    this.pokemon.id = parseInt(key);
    this.pokemon.name = json.name;
    this.pokemon.description = json.description;
    this.pokemon.pokemon_id = json.pokemon_id;
    this.name = this.pokemon.name;
    this.description = this.pokemon.description;
    _callback(json.pokemon_id,classThis)
  }
  getPokemonWithid(id,classThis){
    classThis.pokemonService.getPokemon(id).subscribe(pokemon => classThis.pokemon.pokemon = pokemon);
  }



  //storage
  async clear() {
    await Storage.clear();
  }

}


