import React, { createContext, useContext, useReducer } from 'react';

// Define the interface for the counter state
interface CounterState {
  count: number;
}

// Define the initial state for the counter
const initialState: CounterState = {
  count: 0,
};

// Define the interface for the actions that can be dispatched to the reducer
interface CounterAction {
  type: 'INCREMENT' | 'DECREMENT' | 'ASYNC_INCREMENT';
  payload?: number;
}

// Define the reducer function that will handle the state changes based on the dispatched actions
function counterReducer(
  state: CounterState,
  action: CounterAction
): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'ASYNC_INCREMENT':
      return { count: state.count + (action.payload ?? 0) };
    default:
      return state;
  }
}

// Create the CounterContext
const CounterContext = createContext<
  { state: CounterState; actions: CounterActions } | null
>(null);

// Define a custom hook to make it easier to use the CounterContext
function useCounter(): { state: CounterState; actions: CounterActions } {
  const context = useContext(CounterContext);
  if (!context) {
    throw new Error('useCounter must be used within a CounterProvider');
  }
  return context;
}

// Define the CounterProvider component that will wrap the parts of the app that need access to the counter state and actions
function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  // Define the actions that will be available to components that use the CounterContext
  const actions: CounterActions = {
    increment: () => dispatch({ type: 'INCREMENT' }),
    decrement: () => dispatch({ type: 'DECREMENT' }),
    asyncIncrement: (amount: number) =>
      setTimeout(
        () => dispatch({ type: 'ASYNC_INCREMENT', payload: amount }),
        1000
      ),
  };

  // Combine the state and actions into the context value that will be passed down to the wrapped components
  const contextValue = { state, actions };

  return (
    <CounterContext.Provider value={contextValue}>
      {children}
    </CounterContext.Provider>
  );
}

// Define the interface for the available actions that can be dispatched to the reducer
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  asyncIncrement: (amount: number) => void;
}

export { CounterProvider, useCounter };
