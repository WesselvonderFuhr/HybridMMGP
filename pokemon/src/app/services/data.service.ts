import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from "rxjs/operators";


class Pokemon {
  constructor(
    public name: string,
    public url: string
  ) {}
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://pokeapi.co/api/v2/pokemon/';

  constructor(
    private http: HttpClient) { }

  getPokemons(): Observable<Pokemon[]>{
    return this.http.get(this.url + '?limit=151').pipe(
      map((response:any) => {
        return response.results.map(item => {
          return new Pokemon(
            item.name,
            item.url
          );
        });
      })
    );
  }
}
