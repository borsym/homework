import { Key, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Pokemon from '../components/Pokemon';
import { twStyles } from '../styles/styles';
import FilterOptions from '../components/FilterOptions';
import { DataResultPokemon, PokemonListResponse } from '../utils/Types';
import { useAppSelector } from '../hooks/hooks';
import { RenderLoadingError } from '../components/RenderLoadingError';
import { useGetPokemonsQuery } from '../services/pokemonAPI';

/**Home component that displays a list of Pokemon with filter options
 * @function Home
 * @returns {JSX.Element} - The component's rendered content.
 */
function Home() {
  const { data, error, isLoading } = useGetPokemonsQuery(10);

  const search = useAppSelector((state) => state.filters.search);
  const showOnlyCaught = useAppSelector(
    (state) => state.filters.showOnlyCaught
  );
  const selectedTypes = useAppSelector((state) => state.filters.selectedTypes);
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);

  let filteredPokemon: DataResultPokemon[] | [] = data?.results || [];

  if (showOnlyCaught) {
    filteredPokemon = filteredPokemon.filter(
      (pokemon: DataResultPokemon) => pokemons[pokemon.name]
    );
  }

  if (search.length > 0) {
    const searchLower = search.toLowerCase();
    filteredPokemon = filteredPokemon.filter((pokemon: DataResultPokemon) =>
      pokemon.name.includes(searchLower)
    );
  }

  return (
    <RenderLoadingError loading={isLoading} data={data} error={error}>
      <div className="">
        <Navbar />
        <main className={`${twStyles.flexCenter}  sm:h-screen max-sm:flex-col`}>
          <div className="flex flex-col gap-5 mr-14 max-sm:mr-0">
            <FilterOptions />
          </div>
          <div className="flex flex-col gap-5 max-sm:bg-blue-100 max-sm:max-w-xs">
            <div className="flex gap-5 max-sm:flex-row max-sm:justify-between max-sm:items-center">
              <span className="max-sm:w-1/3">Name</span>
              <span className="max-sm:w-1/3">Type</span>
              <span className="max-sm:w-1/3">Status</span>
            </div>
            <div className="flex gap-4 flex-col max-w-full overflow-y-auto max-h-96">
              {filteredPokemon.map((pokemon: DataResultPokemon, i: Key) => {
                return (
                  <Pokemon
                    name={pokemon.name}
                    url={pokemon.url}
                    key={i}
                    selectedTypes={selectedTypes}
                  />
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </RenderLoadingError>
  );
}

export default Home;
