import { Component, OnInit } from '@angular/core';
import {DataService} from '../services/data.service';
import {Pokemon} from '../models/pokemon';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.css']
})
export class PokemonDetailsComponent implements OnInit {

  pokemon: Pokemon;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit(): void {
    // this.dataService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
    const id = +this.route.snapshot.paramMap.get('id');
    this.dataService.getPokemon(id).subscribe(pokemon => this.pokemon = pokemon);
  }

}
