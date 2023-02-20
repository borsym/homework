import { Key, useState } from 'react';
import Navbar from '../components/Navbar';
import Pokemon from '../components/Pokemon';
import useAxios from '../hooks/useAxios';
import { twStyles } from '../styles/styles';
import { POKE_API } from '../utils/constants';
import MultiSelect from '../components/MultiSelect';

function Home() {
  const { status, data, error } = useAxios<any>(
    `${POKE_API}pokemon?limit=10&offset=0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

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

  let filteredPokemon = data?.results || [];

  if (showOnlyCaught) {
    filteredPokemon = filteredPokemon.filter(
      (pokemon: any) => pokemonStates[pokemon.name]
    );
  }

  if (search.length > 0) {
    const searchLower = search.toLowerCase();
    filteredPokemon = filteredPokemon.filter((pokemon: any) =>
      pokemon.name.includes(searchLower)
    );
  }

  return (
    <div>
      <Navbar />
      <main className={`${twStyles.flexCenter}  sm:h-screen max-sm:flex-col`}>
        <div className="flex flex-col gap-5 mr-14 max-sm:mr-0">
          <div className="flex flex-col">
            <label
              htmlFor="search"
              className="text-lg font-medium text-gray-700"
            >
              Filters
            </label>
            <input
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-b border-gray-500 py-2 pr-8 pl-4  focus:outline-none focus:border-blue-500"
            />
          </div>
          <MultiSelect
            onChange={(selected: string[] | []) => setSelectedTypes(selected)}
          />
          <div>
            <input
              type="checkbox"
              onChange={(e) => handleShowOnlyCaughtChange(e)}
            />
            <span>Show only caught Pokemon</span>
          </div>
        </div>
        <div className="flex flex-col gap-5 max-sm:bg-blue-100 max-sm:max-w-xs">
          <div className="flex gap-5 max-sm:flex-row max-sm:justify-between max-sm:items-center">
            <span className="max-sm:w-1/3">Name</span>
            <span className="max-sm:w-1/3">Type</span>
            <span className="max-sm:w-1/3">Status</span>
          </div>
          <div className="flex gap-4 flex-col max-w-full">
            {filteredPokemon.map((pokemon: any, i: Key) => {
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
