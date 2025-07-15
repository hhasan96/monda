import { useSnapshot } from 'valtio';

import state from './store';
import Canvas from './canvas';
import Customizer from './pages/Customizer';
import Home from './pages/Home';

function App() {
  const snap = useSnapshot(state);

  return (
    <main className="app transition-all ease-in">
      {snap.intro ? (
        <Home />
      ) : (
        <>
          <Canvas />
          <Customizer />
        </>
      )}
    </main>
  )
}

export default App
