export interface Pokemon {
  id: number;
  pokedexId: number;
  name: string;
  image: string;
  sprite: string;
  stats: Stats;
  generation: number;
  evolutions: Evolution[];
  types: PokemonType[];
}

export interface Stats {
  HP: number;
  speed: number;
  attack: number;
  defense: number;
  special_attack: number;
  special_defense: number;
}

export interface Evolution {
  name: string;
  pokedexId: number;
}

export interface PokemonType {
  id: number;
  name: string;
  image: string;
}

// Interface pour la réponse de l'API des types
export interface TypeResponse {
  id: number;
  name: string;
  image: string;
}
