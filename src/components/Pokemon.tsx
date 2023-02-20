import React, { Key, useState } from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';
import useAxios from '../hooks/useAxios';
import { capitalizeFirstLetter } from '../utils/utils';
import { useNavigate } from 'react-router-dom';

type Props = {
  url: string;
  name: string;
  caught: boolean;
  onCaughtChange: (caught: boolean) => void;
  selectedTypes: string[];
};

function Pokemon(props: Props) {
  const { url, name, caught, onCaughtChange, selectedTypes } = props;
  const navigate = useNavigate();
  const { status, data, error } = useAxios<any>(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const [selected, setSelected] = useState(null);

  const handleCaughtChange = (caught: boolean) => {
    onCaughtChange(caught);
  };

  const handleSelectPokemon = (
    name: string,
    sprites: any,
    weight: number,
    height: number,
    abilities: any,
    caught: boolean
  ) => {
    setSelected(data);
    navigate(`/pokemon/${name}`, {
      state: {
        name: name,
        imageUrl: sprites.other.home.front_default,
        weight: weight,
        height: height,
        abilities: abilities,
        caught: caught,
      },
    });
  };

  if (status === 'loading' || !data) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  if (selectedTypes.length > 0) {
    const types = data?.types.map((type: any) => type.type.name);
    const hasSelectedType = selectedTypes.some((type) => types?.includes(type));
    if (!hasSelectedType) {
      return null;
    }
  }

  const { sprites, weight, height, abilities } = data;
  return (
    <>
      <div className="flex gap-8 justify-center items-center">
        <div
          className={`${
            !caught ? 'border-blue-500' : 'border-yellow-400'
          } border-2 min-w-[300px] max-sm:min-w-[200px] flex justify-between items-center p-3 rounded-lg cursor-pointer`}
          onClick={() =>
            handleSelectPokemon(
              name,
              sprites,
              weight,
              height,
              abilities,
              caught
            )
          }
        >
          <span className="max-sm:text-xs">{capitalizeFirstLetter(name)}</span>
          <span className="max-sm:text-xs">
            {data?.types.map((type: any, i: Key) => (
              <span className="max-sm:text-xs" key={i}>
                {capitalizeFirstLetter(type.type.name)}
                {i < data.types.length - 1 && ', '}
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
    </>
  );
}

export default Pokemon;
