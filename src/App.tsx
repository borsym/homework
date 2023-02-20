import { Key, useState } from 'react';
import Button from './components/Button';
import DropDownTypes from './components/MultiSelect';
import Navbar from './components/Navbar';
import Pokemon from './components/Pokemon';
import { CounterProvider, useCounter } from './context/Counter';
import useAxios from './hooks/useAxios';
import { twStyles } from './styles/styles';
import { POKE_API } from './utils/constants';
import MultiSelect from './components/MultiSelect';

function App() {
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
  const [pokemonStates, setPokemonStates] = useState<{
    [name: string]: boolean;
  }>({});
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

  if (status === 'loading') {
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
    filteredPokemon = filteredPokemon.filter((pokemon: any) =>
      pokemon.name.includes(search)
    );
  }

  return (
    <div>
      <Navbar />
      <main className={`${twStyles.flexCenter}  h-screen`}>
        <div className="flex flex-col gap-5 mr-14">
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
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span>Name</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          <div className="flex gap-4 flex-col">
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
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
