import {Pokemon} from './pokemon';
export class PokemonStorage {
    constructor(
      public pokemon: Pokemon,
      public pokemon_id: number,
      public id: number,
      public name: String,
      public description: String,
      public locationPhotoBase64: String
    ) {}
  }
