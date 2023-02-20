import { Key } from 'react';
import Button from './components/Button';
import DropDownTypes from './components/DropDownTypes';
import Navbar from './components/Navbar';
import Pokemon from './components/Pokemon';
import { CounterProvider, useCounter } from './context/Counter';
import useAxios from './hooks/useAxios';
import { twStyles } from './styles/styles';
import { POKE_API } from './utils/constants';

function App() {
  const { status, data, error } = useAxios<any>(
    `${POKE_API}pokemon?limit=10&offset=0`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>{error?.message || 'An error occurred'}</p>;
  }
  return (
    <div>
      <Navbar />

      <main className={`${twStyles.flexCenter}  h-screen`}>
        <div className="flex flex-col gap-5 mr-14">
          <div className="flex flex-col">
            <label
              htmlFor="search"
              className="text-lg font-medium text-gray-700"
            >
              Filters
            </label>
            <input placeholder="search" />
          </div>
          <DropDownTypes label="Pokemon Types" />
          <div>
            <input type="checkbox" />
            <span>Show only caught Pokemon</span>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex gap-5">
            <span>Name</span>
            <span>Type</span>
            <span>Status</span>
          </div>
          <div className="flex gap-4 flex-col">
            {data?.results.map((pokemon: any, i: Key) => (
              <Pokemon name={pokemon.name} url={pokemon.url} key={i} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

{
  /* <div>
<CounterDisplay />
<CounterButtons />
<Button
  label="Click me!"
  onClick={handleClick}
  className={twStyles.btn}
/>
</div> */
}
// function CounterDisplay() {
//   const { state } = useCounter();

//   return <div>Count: {state.count}</div>;
// }

// function CounterButtons() {
//   const { actions } = useCounter();

//   return (
//     <div>
//       <button onClick={actions.increment}>Increment </button>
//       <button onClick={actions.decrement}>Decrement </button>
//       <button onClick={() => actions.asyncIncrement(2)}>
//         Async Increment{' '}
//       </button>
//     </div>
//   );
// }

export default App;
