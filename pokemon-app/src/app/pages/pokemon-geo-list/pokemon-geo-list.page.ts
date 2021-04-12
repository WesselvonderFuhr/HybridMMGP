import {Component, OnInit} from '@angular/core';
import {PokemonGeotagged} from '../../models/pokemon-geotagged';
import {Pokemon} from '../../models/pokemon';
import {PokemonService} from '../../services/pokemon.service';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {Router} from '@angular/router';
import {CameraResultType, CameraSource, Plugins} from '@capacitor/core';
import { ToastController } from '@ionic/angular';


const { Storage } = Plugins;
const { Camera } = Plugins;



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
  pokemonsAreLoaded = false;
  constructor(private pokemonService: PokemonService,private route: Router,private geolocation: Geolocation,public toastController: ToastController) { }

  async CatchPokemon(pokemon) {
    try{
      const locationPhoto = await Camera.getPhoto({
        quality: 50,
        source: CameraSource.Camera,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      }).catch((e) => {
        throw new Error(e);
      });
      await this.AddObjectToCatchedPokemon(pokemon, locationPhoto.base64String);
      this.route.navigate(['/pokemon-caught-list']);
    } catch (e){
      const toast = await this.toastController.create({
        message: 'The pokemon ran away!\nDoes your camera work?',
        duration: 3000
      });
      toast.present();
      return;
    }
  }
  //start: this should be in the camera bit move later
  async AddObjectToCatchedPokemon(pokemon, locationPhotoBase64) {
    let newId = 1;
    const { keys } = await Storage.keys();
    keys.forEach(item =>{
      if((parseInt(item) >= newId)){
        newId = parseInt(item) + 1;
      }
    });
    await Storage.set({
      key: newId + '',
      value: JSON.stringify({
        pokemon_id: pokemon.id,
        pokemon_name: pokemon.name,
        name: '',
        description: '',
        locationPhotoBase64: locationPhotoBase64
      })
    });
  }
  //end: this should be in the camera bit move later

  ngOnInit() {
    let options = {timeout: 5000};
    this.geolocation.getCurrentPosition(options).then((resp) => {
      this.latitude = Math.round(resp.coords.latitude * 10000) / 10000;
      this.longitude =  Math.round(resp.coords.longitude * 10000) / 10000;
      this.SetPokemons(this.SetGeoPokemon);
     }).catch((error) => {
       console.log('Error getting location', error);
       const toast = this.toastController.create({
        message: 'We could not find your location, your location has been set to default',
        duration: 4000
      }).then(toast =>{
        toast.present(); 
      })
      this.latitude = 51.6885;
      this.longitude =  5.2874;
      this.SetPokemons(this.SetGeoPokemon);
     });
  }

  SetPokemons(_callback){
    let numberOfPokemons = Math.floor(Math.random() * Math.floor(8))+10;
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
      classThis.pokemonsAreLoaded = true;
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

  
  async doRefresh(event) {
    setTimeout(() => {
     
      this.GeoPokemons = new Array();
      this.pokemons = new Array();
      this.ngOnInit();
      event.target.complete();

    }, 1000);
  }



}
