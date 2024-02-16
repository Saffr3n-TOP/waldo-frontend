import { useState } from 'react';
import { waldoFetch } from '../utils/useFetch';
import formatTime from '../utils/formatTime';
import '../assets/styles/index.css';

type IndexProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Index({ setStartGame }: IndexProps) {
  const [leaders, setLeaders] = useState<ApiData['leaders'] | undefined>();

  const onStart = () => setStartGame(true);
  const onLeaderboard = () => {
    waldoFetch('/leaderboard').then((data) => {
      if (data instanceof Error) return;
      setLeaders(data!.leaders);
    });
  };

  return (
    <main className="index">
      {!leaders ? (
        <>
          <h1>Where's Waldo</h1>

          <p>
            After you start the game you will be given a large picture with a
            lot of details and instructions on what exactly to look for on that
            picture. Your task is to find everything described in the
            instructions in as least amount of time as possible. Good luck!
          </p>

          <button type="button" onClick={onStart}>
            Start
          </button>

          <button type="button" onClick={onLeaderboard}>
            Leaderboard
          </button>
        </>
      ) : (
        <ul>
          {leaders.map((leader) => (
            <li>{`${leader.name}: ${formatTime(leader.time)}`}</li>
          ))}
        </ul>
      )}
    </main>
  );
}
