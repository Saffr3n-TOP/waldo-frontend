import { useState } from 'react';
import Index from './components/Index';
import Game from './components/Game';

export default function App() {
  const [startGame, setStartGame] = useState(false);

  return !startGame ? (
    <Index setStartGame={setStartGame} />
  ) : (
    <Game setStartGame={setStartGame} />
  );
}
