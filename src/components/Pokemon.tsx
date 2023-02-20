import React from 'react';
import Button from './Button';
import { twStyles } from '../styles/styles';

type Props = {};

function Pokemon(props: Props) {
  
  return (
    <div>
      <div>
        <span>Name</span>
        <span>Type (fire)</span>
        <span>status</span>
      </div>
      <div>
        <Button label="catch" onClick={() => {}} className={twStyles.btn} />
      </div>
    </div>
  );
}

export default Pokemon;
