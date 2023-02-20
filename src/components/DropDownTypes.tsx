import React from 'react';
import useAxios from '../hooks/useAxios';
import { POKE_API } from '../utils/constants';

interface Props {
  label: string;
  optionsEndpoint?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function DropDownTypes({ label, optionsEndpoint, value, onChange }: Props) {
  const { status, data, error } = useAxios<any>(`${POKE_API}type`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }

  return (
    <div>
      <label htmlFor={label} className="text-lg font-medium text-gray-700">
        {label}:
      </label>

      <select
        id={label}
        name={label}
        className="focus:ring-red-500 focus:border-red-500 block w-full pl-3 pr-12 sm:text-sm border-gray-300 rounded-md"
        value={value}
        // onChange={handleChange}
      >
        <option value="">Select an option</option>
        {/* {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))} */}
      </select>
    </div>
  );
}

export default DropDownTypes;
