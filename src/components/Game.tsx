import { useState, useEffect, useRef } from 'react';
import formatTime from '../utils/formatTime';
import imgSrc from '../assets/waldo.jpeg';
import '../assets/styles/game.css';

type GameProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ setStartGame }: GameProps) {
  const [time, setTime] = useState(0);
  const headRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setTime((time) => time + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const head = headRef.current!;
    const main = mainRef.current!;
    const resizeObserver = new ResizeObserver(() => {
      main.style.height = `calc(100dvh - ${head.clientHeight}px)`;
    });

    resizeObserver.observe(head);
    return () => resizeObserver.unobserve(head);
  }, []);

  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setStartGame(false);
  };

  return (
    <>
      <header ref={headRef}>
        <a
          href="/"
          className="logo"
          onClick={onLogoClick}
          aria-label="Go back to home page"
        >
          Where's Waldo
        </a>

        <span>{formatTime(time)}</span>
      </header>

      <main className="game" ref={mainRef}>
        <img src={imgSrc} alt="Where's Waldo picture" />
      </main>
    </>
  );
}
