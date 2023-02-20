import React from 'react';

interface Props {
  label: string;
  optionsEndpoint?: string;
  value?: string;
  onChange?: (value: string) => void;
}

function DropDownTypes({ label, optionsEndpoint, value, onChange }: Props) {
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
