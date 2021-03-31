import { Component, OnInit } from '@angular/core';
import {PokemonGeotagged} from '../../models/pokemon-geotagged';
import {Pokemon} from '../../models/pokemon';
import { PokemonService } from '../../services/pokemon.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Router } from '@angular/router';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;



@Component({
  selector: 'app-pokemon-geo-list',
  templateUrl: './pokemon-geo-list.page.html',
  styleUrls: ['./pokemon-geo-list.page.scss'],
})
export class PokemonGeoListPage implements OnInit {
    
  pokemons : Pokemon[] = new Array();
  latitude = 0;
  longitude = 0;
  GeoPokemons : PokemonGeotagged[] = new Array();
  constructor(private pokemonService: PokemonService,private route: Router) { }


  GoTocatchpage(pokemon) {
    //this should be in the camera bit move later
    this.AddObjectToCatchedPokemon(pokemon)

    this.route.navigate(['/pokemon-caught-list']);
  }
  //start: this should be in the camera bit move later
  async AddObjectToCatchedPokemon(pokemon) {
    let newId = 1;
    const { keys } = await Storage.keys();
    keys.forEach(item =>{
      if((parseInt(item) >= newId)){
        newId = parseInt(item)+1;
      }
    }); 
    await Storage.set({
      key: newId + '',
      value: JSON.stringify({
        pokemon_id: pokemon.id,
        pokemon_name: pokemon.name,
        name: '',
        description: ''
      })
    });
  }
  //end: this should be in the camera bit move later

  ngOnInit() {
    
    let geolocation = new Geolocation();
    geolocation.getCurrentPosition().then((resp) => {
      this.latitude = Math.round(resp.coords.latitude * 10000) / 10000;
      this.longitude =  Math.round(resp.coords.longitude * 10000) / 10000;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     this.SetPokemons(this.SetGeoPokemon);
     
  }

  SetPokemons(_callback){
    let numberOfPokemons = Math.floor(Math.random() * Math.floor(8))+2; 
    for (let i = 0; i < numberOfPokemons; i++) {
      this.GeneratePokemon(_callback,numberOfPokemons);
    }
  }

  GeneratePokemon(_callback,numberOfPokemons){
    //get pokemon
    let randomPokemonID = Math.floor(Math.random() * Math.floor(151))+1; 
    this.pokemonService.getPokemon(randomPokemonID).subscribe(pokemon =>{
      this.pokemons.push(pokemon);
      _callback(numberOfPokemons,this.pokemons.length,this);
    } );
    
  }
  


  SetGeoPokemon(numberOfPokemons,currentPokemon,classThis){
    if(numberOfPokemons == currentPokemon){
      classThis.pokemons.forEach(element => {
        classThis.GeoPokemons.push(new PokemonGeotagged(element,0,0,true));
        classThis.SetLatLongGeoPokemons();
      });
      classThis.GeoPokemons[0].longitude = classThis.longitude;
      classThis.GeoPokemons[0].latitude = classThis.latitude;
      classThis.SetPokemonCantCatch();
      console.log(classThis.GeoPokemons);
    }
  }

  GenerateLatlong(value){
    let negativeOperator = Math.floor(Math.random() * Math.floor(2)); 
    
    value = value + Math.random() * 0.0001;
    if(negativeOperator){
      value * -1;
    }
    return Math.round(value * 10000) / 10000;

  }

  SetLatLongGeoPokemons(){
    this.GeoPokemons.forEach(element => {
      element.longitude = this.GenerateLatlong(this.longitude);
      element.latitude = this.GenerateLatlong(this.latitude);
    });
  }

  SetPokemonCantCatch(){
    this.GeoPokemons.forEach(element => {
      if(element.latitude == this.latitude && element.longitude == this.longitude){
          element.cantCatch = false;
      }
    });
  }

}
