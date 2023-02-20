import React, { Key, useState } from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';
import useAxios from '../hooks/useAxios';
import { capitalizeFirstLetter } from '../utils/helperFunctions';

type Props = {
  url: String;
  name: String;
};

function Pokemon(props: Props) {
  const { url, name } = props;
  const { status, data, error } = useAxios<any>(`${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // create a state that storts a string
  const [caught, setCaught] = useState(false);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  console.log(data?.types);
  return (
    <div className="flex gap-3 justify-center items-center">
      <div className="border-blue-500 border-2 min-w-[300px] flex justify-between items-center p-3">
        <span className="flex-1">{capitalizeFirstLetter(name)}</span>
        <span className="">
          {data?.types.map((type: any, i: Key) => (
            <span key={i}>{capitalizeFirstLetter(type.type.name)} </span>
          ))}
        </span>
        <span className="flex-1">{status}</span>
      </div>
      <div>
        <Button
          label={`${!caught ? 'Catch' : 'Release'}`}
          onClick={() => {}}
          className={`${!caught ? twStyles.btn : twStyles.btnRelease}`}
        />
      </div>
    </div>
  );
}

export default Pokemon;
