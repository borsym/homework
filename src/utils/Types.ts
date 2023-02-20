export type DataResultPokemon = {
  name: string;
  url: string;
};

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DataResultPokemon[];
}

export interface PokemonOption {
  value: string;
  label: string;
}

export interface PokemonType {
  type: DataResultPokemon;
}
