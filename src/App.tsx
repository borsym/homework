import Button from './components/Button';
import Navbar from './components/Navbar';
import Pokemon from './components/Pokemon';
import { CounterProvider, useCounter } from './context/Counter';
import useAxios from './hooks/useAxios';
import useFetch from './hooks/useFetch';
import { twStyles } from './styles/styles';

function App() {
  // const { status, data, error } = useAxios<any>(
  //   'https://random-data-api.com/api/v2/users',
  //   {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: 'Bearer TOKEN_HERE',
  //     },
  //     params: {
  //       param1: 'value1',
  //       param2: 'value2',
  //     },
  //   }
  // );
  // const { status, data, error } = useFetch<any>(
  //   'https://random-data-api.com/api/v2/users'
  // );

  // function handleClick() {
  //   console.log('Button clicked!');
  // }

  // if (status === 'loading') {
  //   return <p>Loading...</p>;
  // }

  // if (status === 'error') {
  //   return <p>{error?.message || 'An error occurred'}</p>;
  // }
  // console.log(data);
  return (
    <>
      <Navbar />

      <main>
        <div>
          <input placeholder="search" />
        
          <div>
            <input type="checkbox" />
            <span>Show only caught Pokemon</span>
          </div>
        </div>
        <div>
          <span>Name</span>
          <span>Type</span>
          <span>Status</span>
        </div>
        <div>
          <Pokemon />
        </div>
      </main>
    </>
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
