import React, { Key, useState } from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';
import useAxios from '../hooks/useAxios';
import { capitalizeFirstLetter } from '../utils/utils';
import { Link, useNavigate } from 'react-router-dom';

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
    abilities: any
  ) => {
    setSelected(data);
    navigate(`/pokemon/${name}`, {
      state: {
        name: name,
        imageUrl: sprites.other.home.front_default,
        weight: weight,
        height: height,
        abilities: abilities,
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
  console.log(weight);
  return (
    <>
      <div className="flex gap-8 justify-center items-center">
        <div
          className={`${
            !caught ? 'border-blue-500' : 'border-yellow-400'
          } border-2 min-w-[300px] flex justify-between items-center p-3 rounded-lg`}
          onClick={() =>
            handleSelectPokemon(name, sprites, weight, height, abilities)
          }
        >
          <span className="">{capitalizeFirstLetter(name)}</span>
          <span className="">
            {data?.types.map((type: any, i: Key) => (
              <span key={i}>{capitalizeFirstLetter(type.type.name)} </span>
            ))}
          </span>
          <span className="">{!caught ? '-' : 'Caught'}</span>
        </div>
        <div>
          <Button
            label={`${!caught ? 'Catch' : 'Release'}`}
            onClick={() => handleCaughtChange(!caught)}
            className={`${!caught ? twStyles.btn : twStyles.btnRelease}`}
          />
        </div>
      </div>
    </>
  );
}

export default Pokemon;
