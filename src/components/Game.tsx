import { useState, useEffect, useRef } from 'react';
import useFetch from '../utils/useFetch';
import Header from './Header';
import imgSrc from '../assets/waldo.jpeg';
import '../assets/styles/game.css';

type GameProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ setStartGame }: GameProps) {
  const { error, data } = useFetch('http://localhost:3000');
  const [time, setTime] = useState(0);

  const headRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!data) return;
    const interval = setInterval(() => setTime((time) => time + 1), 1000);
    return () => clearInterval(interval);
  }, [data]);

  useEffect(() => {
    if (!data) return;
    const head = headRef.current!;
    const main = mainRef.current!;
    const resizeObserver = new ResizeObserver(() => {
      main.style.height = `calc(100dvh - ${head.clientHeight}px)`;
    });

    resizeObserver.observe(head);
    return () => resizeObserver.unobserve(head);
  }, [data]);

  return data ? (
    <>
      <Header setStartGame={setStartGame} time={time} ref={headRef} />

      <main className="game" ref={mainRef}>
        <img src={imgSrc} alt="Where's Waldo picture" />
      </main>
    </>
  ) : error ? (
    error.message
  ) : (
    'Loading...'
  );
}
