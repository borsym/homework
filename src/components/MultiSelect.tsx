import React, { useState } from 'react';
import Select, { ValueType } from 'react-select';
import useAxios from '../hooks/useAxios';
import { POKE_API } from '../utils/constants';
import { capitalizeFirstLetter } from '../utils/utils';
import {
  DataResultPokemon,
  PokemonListResponse,
  PokemonOption,
} from '../utils/Types';
import { RenderLoadingError } from './RenderLoadingError';

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#3182ce' : '#ffffff',
    color: state.isSelected ? '#ffffff' : '#1a202c',
    ':hover': {
      backgroundColor: '#e2e8f0',
    },
  }),
  multiValue: (provided: any) => ({
    ...provided,
    backgroundColor: '#4299e1',
    color: '#ffffff',
  }),
  multiValueLabel: (provided: any) => ({
    ...provided,
    color: '#ffffff',
  }),
  multiValueRemove: (provided: any) => ({
    ...provided,
    color: '#ffffff',
    ':hover': {
      backgroundColor: '#2c5282',
    },
  }),
};

interface Props {
  onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<Props> = ({ onChange }) => {
  const { status, data, error } = useAxios<PokemonListResponse>(
    `${POKE_API}type`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  const [selectedOptions, setSelectedOptions] = useState<
    ValueType<PokemonOption>
  >([]);

  const handleChange = (selectedOptions: ValueType<PokemonOption>) => {
    const selectedValues = (selectedOptions as PokemonOption[])?.map(
      (option) => option.value
    );
    setSelectedOptions(selectedOptions);
    onChange(selectedValues || []);
  };

  if (status === 'loading' || !data) {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  let options: DataResultPokemon[] | PokemonOption[] = data?.results || [];

  options = options.map((option) => ({
    value: option.name,
    label: capitalizeFirstLetter(option.name),
  }));

  return (
    <RenderLoadingError status={status} data={data} error={error}>
      <div className="max-w-[300px]">
        <label htmlFor="type">Pokemon Types</label>
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleChange}
          styles={customStyles}
          placeholder="Select..."
        />
      </div>
    </RenderLoadingError>
  );
};

export default MultiSelect;
