import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
 
  navigate : any;
  constructor() {
    this.sideMenu();
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
