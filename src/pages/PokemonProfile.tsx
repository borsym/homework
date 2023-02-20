import { Key } from 'react';
import { useLocation } from 'react-router-dom';

type Props = {};

function PokemonProfile(props: Props) {
  const location = useLocation();
  const { name, weight, height, imageUrl, abilities } = location.state;

  console.log(abilities);

  return (
    <div className="flex justify-center items-center flex-row h-screen">
      <div className="">
        <img
          src={imageUrl}
          alt={name}
          className="w-48 h-48 object-contain mb-4"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-2">{name}</h2>
        <div className="flex items-center justify-center gap-2">
          {abilities.map((el: any, index: Key) => (
            <span key={index} className="">
              {el.ability.name}
            </span>
          ))}
        </div>
        <p className="text-lg my-4">
          Height: {height / 10}m | Weight: {weight / 10}kg
        </p>
      </div>
    </div>
  );
}

export default PokemonProfile;
