import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POKE_API } from '../utils/constants';
// import type { Pokemon } from './types';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${POKE_API}` }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query<any, string>({
      query: (name) => `pokemon/${name}`,
    }),

    getTypes: builder.query({
      query: () => `type`,
    }),

    getPokemons: builder.query<any, number>({
      query: (limit) => `pokemon?limit=${limit}&offset=0`,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetPokemonByNameQuery,
  useGetTypesQuery,
  useGetPokemonsQuery,
} = pokemonApi;
