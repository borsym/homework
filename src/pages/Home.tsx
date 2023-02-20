import { Key, useState } from 'react';
import Navbar from '../components/Navbar';
import Pokemon from '../components/Pokemon';
import useAxios from '../hooks/useAxios';
import { twStyles } from '../styles/styles';
import { POKE_API, options } from '../utils/constants';
import FilterOptions from '../components/FilterOptions';
import { DataResultPokemon } from '../utils/Types';
const url = `${POKE_API}pokemon?limit=10&offset=0`;

function Home() {
  const { status, data, error } = useAxios<any>(`${url}`, options);

  const [search, setSearch] = useState<string>('');
  const [pokemonStates, setPokemonStates] = useState<Record<string, boolean>>(
    {}
  );
  const [showOnlyCaught, setShowOnlyCaught] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleShowOnlyCaughtChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setShowOnlyCaught(event.target.checked);
  };

  const handleCaughtChange = (name: string, caught: boolean) => {
    setPokemonStates({ ...pokemonStates, [name]: caught });
  };

  if (status === 'loading' || !data) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  let filteredPokemon: DataResultPokemon[] | [] = data?.results || [];

  if (showOnlyCaught) {
    filteredPokemon = filteredPokemon.filter(
      (pokemon: DataResultPokemon) => pokemonStates[pokemon.name]
    );
  }

  if (search.length > 0) {
    const searchLower = search.toLowerCase();
    filteredPokemon = filteredPokemon.filter((pokemon: DataResultPokemon) =>
      pokemon.name.includes(searchLower)
    );
  }

  return (
    <div className="">
      <Navbar />
      <main className={`${twStyles.flexCenter}  sm:h-screen max-sm:flex-col`}>
        <div className="flex flex-col gap-5 mr-14 max-sm:mr-0">
          <FilterOptions
            search={search}
            setSearch={setSearch}
            setSelectedTypes={setSelectedTypes}
            handleShowOnlyCaughtChange={handleShowOnlyCaughtChange}
          />
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
                  caught={pokemonStates[pokemon.name]}
                  onCaughtChange={(caught: boolean) =>
                    handleCaughtChange(pokemon.name, caught)
                  }
                  selectedTypes={selectedTypes}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
