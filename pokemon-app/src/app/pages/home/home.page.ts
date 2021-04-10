import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  navigate : any;
  constructor(private geolocation: Geolocation) {
    this.sideMenu();
    this.geolocation.getCurrentPosition().then((resp) => {
      let latitude = Math.round(resp.coords.latitude * 10000) / 10000;
      let longitude =  Math.round(resp.coords.longitude * 10000) / 10000;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "All pokemon",
        url   : "/pokemon-list-all",

      },
      {
        title : "Pokemons in de buurt",
        url   : "/pokemon-geo-list",
      },
      {
        title : "Gevangen Pokemons",
        url   : "/pokemon-caught-list",
      },
    ]
  }
}
