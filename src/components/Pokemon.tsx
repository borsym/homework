import React, { Key } from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';
import useAxios from '../hooks/useAxios';
import { capitalizeFirstLetter } from '../utils/helperFunctions';

type Props = {
  url: String;
  name: String;
  caught: boolean;
  onCaughtChange: (caught: boolean) => void;
};

function Pokemon(props: Props) {
  const { url, name, caught, onCaughtChange } = props;
  const { status, data, error } = useAxios<any>(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const handleCaughtChange = (caught: boolean) => {
    onCaughtChange(caught);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  return (
    <div className="flex gap-8 justify-center items-center">
      <div
        className={`${
          !caught ? 'border-blue-500' : 'border-yellow-400'
        } border-2 min-w-[300px] flex justify-between items-center p-3 rounded-lg`}
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
  );
}

export default Pokemon;
