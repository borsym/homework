import React, { Key } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/Button';
import { twStyles } from '../styles/styles';

type Props = {};

function PokemonProfile(props: Props) {
  const location = useLocation();
  const { name, weight, height, imageUrl, abilities, caught } = location.state;

  console.log(abilities);

  return (
    <div>
      <div className="flex justify-center items-center flex-row h-screen max-sm:flex-col">
        <div className="flex flex-col">
          <Button
            label="Back to search"
            onClick={() => window.history.back()}
            className="flex items-start"
          />
          <div
            className={`${
              !caught ? 'border-blue-500' : 'border-yellow-400'
            } border-2 rounded-lg p-4 mr-4`}
          >
            <img
              src={imageUrl}
              alt={name}
              className="w-48 h-48 object-contain mb-4"
            />
          </div>
        </div>
        <div>
          <table className="table-auto mt-4">
            <tbody>
              <tr className="bg-blue-200">
                <td className="font-semibold p-2">Name</td>
                <td className="p-2">{name}</td>
              </tr>
              <tr className="bg-yellow-200">
                <td className="font-semibold p-2">Height</td>
                <td className="p-2">{height / 10}m</td>
              </tr>
              <tr className="bg-blue-200">
                <td className="font-semibold p-2">Weight</td>
                <td className="p-2">{weight / 10}kg</td>
              </tr>
              <tr className="bg-yellow-200">
                <td className="font-semibold p-2">Abilities</td>
                <td className="p-2">
                  <ul className="list-disc">
                    {abilities.map((el: any, index: Key) => (
                      <li key={index} className="">
                        {el.ability.name}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={`${twStyles.flexCenter} mt-4`}>
            <Button
              label={`${!caught ? 'Catch' : 'Release'}`}
              onClick={() => {}}
              disabled={true}
              className={`${
                !caught ? twStyles.btn : twStyles.btnRelease
              } max-sm:min-w-full`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonProfile;
