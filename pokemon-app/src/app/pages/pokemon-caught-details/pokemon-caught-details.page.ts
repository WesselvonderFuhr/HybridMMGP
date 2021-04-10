import { Component, Directive, OnInit } from '@angular/core';
import {PokemonService} from '../../services/pokemon.service';
import {Pokemon} from '../../models/pokemon';
import {ActivatedRoute} from '@angular/router';
import { Plugins } from '@capacitor/core';
import { PokemonStorage } from 'src/app/models/pokemon-storage';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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
    private pokemonService: PokemonService,private router: Router,public toastController: ToastController) {
      this.pokemon = new PokemonStorage(null,0,0,'','');
   
     }
    
  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.setPokemonObject(id,this.getPokemonWithid,this);
  }
  
  async setPokemonObject(key,_callback,classThis) {
    let ret = await Storage.get({ key: key});
    let json = JSON.parse(ret.value);
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

  FreePokemon(){
    Storage.remove({ key: this.pokemon.id.toString() });
    this.router.navigate(['/home']);
  }

  async SaveInfo(){
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
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000
    });
    toast.present(); 
  }

  //storage
  async clear() {
    await Storage.clear();
  }

}


