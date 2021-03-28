import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Pokemon} from '../models/pokemon';
import {PokemonList} from '../models/pokemon-list';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient) { }

  getPokemons(): Observable<PokemonList[]>{
    return this.http.get(this.url + '?limit=151').pipe(
      map((response: any) => {
        return response.results.map(item => {
          return new PokemonList(
            item.name,
            +item.url.replace(this.url, '').replace('/', '')
          );
        });
      })
    );
  }

  getPokemon(id: number): Observable<Pokemon>{
    return this.http.get(this.url + id + '/').pipe(
      map((item: any) => {
          return new Pokemon(
            item.name,
            item.id,
            item.types[0].type.name,
            item.sprites.front_default,
            item.height,
            item.weight,
            item.stats[0].base_stat,
            item.stats[1].base_stat,
            item.stats[2].base_stat,
            item.stats[5].base_stat
          );
      })
    );
  }
}
