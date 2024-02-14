import { useState } from 'react';
import Index from './components/Index';

export default function App() {
  const [startGame, setStartGame] = useState(false);

  return !startGame ? (
    <Index setStartGame={setStartGame} />
  ) : (
    'TODO: Game component'
  );
}
