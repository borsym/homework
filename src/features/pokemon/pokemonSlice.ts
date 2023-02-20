import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  pokemons: Record<string, boolean>;
}

const initialState: PokemonState = {
  pokemons: {},
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    setPokemons(state, action: PayloadAction<{}>) {
      state.pokemons = action.payload;
    },
    catchPokemon: (state, action: PayloadAction<string>) => {
      state.pokemons[action.payload] = true;
    },
    releasePokemon: (state, action: PayloadAction<string>) => {
      state.pokemons[action.payload] = false;
    },
  },
});

export const { setPokemons, catchPokemon, releasePokemon } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
