import { Key } from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';
import { capitalizeFirstLetter } from '../utils/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { catchPokemon, releasePokemon } from '../features/pokemon/pokemonSlice';
import { PokemonType } from '../utils/Types';
import { useGetPokemonByNameQuery } from '../services/pokemonAPI';
import { RenderLoadingError } from './RenderLoadingError';

type Props = {
  url: string;
  name: string;
  selectedTypes: string[];
};

function Pokemon(props: Props) {
  const { name, selectedTypes } = props;
  const pokemons = useAppSelector((state) => state.pokemon.pokemons);
  const { data, error, isLoading } = useGetPokemonByNameQuery(name);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const caught = pokemons[name] || false;

  const handleCaughtChange = (caught: boolean) => {
    if (caught) {
      dispatch(catchPokemon(name));
    } else {
      dispatch(releasePokemon(name));
    }
  };

  const handleSelectPokemon = (
    name: string,
    sprites: string,
    weight: number,
    height: number,
    abilities: {}[]
  ) => {
    navigate(`/pokemon/${name}`, {
      state: {
        name: name,
        imageUrl: sprites,
        weight: weight,
        height: height,
        abilities: abilities,
      },
    });
  };

  if (selectedTypes.length > 0) {
    const types = data?.types.map((type: PokemonType) => type.type.name);
    const hasSelectedType = selectedTypes.some((type) => types?.includes(type));
    if (!hasSelectedType) {
      return null;
    }
  }

  const { sprites, weight, height, abilities } = data;
  return (
    <RenderLoadingError error={error} data={data} loading={isLoading}>
      <div className="flex gap-8 justify-center items-center">
        <div
          className={`${
            !caught ? 'border-blue-500' : 'border-yellow-400'
          } border-2 min-w-[300px] max-sm:min-w-[200px] flex justify-between items-center p-3 rounded-lg cursor-pointer`}
          onClick={() =>
            handleSelectPokemon(
              name,
              sprites.other.home.front_default,
              weight,
              height,
              abilities
            )
          }
        >
          <span className="max-sm:text-xs">{capitalizeFirstLetter(name)}</span>
          <span className="max-sm:text-xs">
            {data?.types.map((type: PokemonType, i: Key) => (
              <span className="max-sm:text-xs" key={i}>
                {capitalizeFirstLetter(type.type.name)}
                {(i as number) < data.types.length - 1 && ', '}
              </span>
            ))}
          </span>
          <span className="max-sm:text-xs">{!caught ? '-' : 'Caught'}</span>
        </div>
        <div>
          <Button
            label={`${!caught ? 'Catch' : 'Release'}`}
            onClick={() => handleCaughtChange(!caught)}
            className={`${
              !caught ? twStyles.btn : twStyles.btnRelease
            } max-sm:text-xs`}
          />
        </div>
      </div>
    </RenderLoadingError>
  );
}

export default Pokemon;
