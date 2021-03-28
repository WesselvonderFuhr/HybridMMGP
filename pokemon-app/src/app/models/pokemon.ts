export class Pokemon {
  constructor(
    public name: string,
    public id: number,
    public type: string,
    public sprite: string,
    public height: number,
    public weight: number,
    public hp: number,
    public attack: number,
    public defence: number,
    public speed: number
  ) {}
}
