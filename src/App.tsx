import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
type Props = {};

const Home = lazy(() => import('./pages/Home'));
const PokemonProfile = lazy(() => import('./pages/PokemonProfile'));

function App(props: Props) {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonProfile />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
