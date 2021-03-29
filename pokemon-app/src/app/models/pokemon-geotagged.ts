import {Pokemon} from '../models/pokemon';
export class PokemonGeotagged {
    constructor(
      public pokemon: Pokemon,
      public latitude: number,
      public longitude: number,
      public cantCatch: boolean
    ) {}
  }
  