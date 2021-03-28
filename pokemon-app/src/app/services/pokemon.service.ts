import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {Pokemon} from '../models/pokemon';
import {PokemonList} from '../models/pokemon-list';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient) { }

  getPokemons(): Observable<PokemonList[]>{
    return this.http.get(this.url + '?limit=151').pipe(
      map((response: any) => {
        return response.results.map(item => {
          return new PokemonList(
            item.name.charAt(0).toUpperCase() + item.name.slice(1),
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
          item.name.charAt(0).toUpperCase() + item.name.slice(1),
          item.id,
          item.types[0].type.name.charAt(0).toUpperCase() + item.types[0].type.name.slice(1),
          item.sprites.front_default,
          item.height / 10,
          item.weight / 10,
          item.stats[0].base_stat,
          item.stats[1].base_stat,
          item.stats[2].base_stat,
          item.stats[5].base_stat
        );
      })
    );
  }
}
