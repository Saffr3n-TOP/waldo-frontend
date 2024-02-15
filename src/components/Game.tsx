import { useState, useEffect, useRef } from 'react';
import useFetch from '../utils/useFetch';
import Header from './Header';
import imgSrc from '../assets/waldo.jpeg';
import '../assets/styles/game.css';

type GameProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

type PointData = {
  clientX: number;
  clientY: number;
  offsetX: number;
  offsetY: number;
  windowWidth: number;
  windowHeight: number;
};

export default function Game({ setStartGame }: GameProps) {
  const [time, setTime] = useState(0);
  const { error, data } = useFetch('http://localhost:3000');
  const [pointData, setPointData] = useState<PointData>();

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

  const onImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (pointData) return setPointData(undefined);

    const img = e.target as HTMLImageElement;
    const { x, y } = img.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const data: PointData = {
      clientX: e.clientX,
      clientY: e.clientY,
      offsetX: Math.round(x),
      offsetY: Math.round(y),
      windowWidth,
      windowHeight
    };

    setPointData(data);
  };

  const onLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    // TODO
  };

  return data ? (
    <>
      <Header setStartGame={setStartGame} time={time} ref={headRef} />

      <main className="game" ref={mainRef}>
        <img src={imgSrc} alt="Where's Waldo picture" onClick={onImageClick} />

        {pointData && (
          <ul style={dropdownStyle(pointData)}>
            {Object.values(data.polygons!).map((polygon) => {
              if (polygon.isFound) return;
              return (
                <li key={polygon._id}>
                  <a href={`/${polygon._id}`} onClick={onLinkClick}>
                    {polygon.name}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </main>
    </>
  ) : error ? (
    error.message
  ) : (
    'Loading...'
  );
}

function dropdownStyle(pointData: PointData) {
  const { clientX, clientY, windowWidth, windowHeight } = pointData;
  const translateX = clientX > windowWidth / 2 ? '-100%' : '0';
  const translateY = clientY > windowHeight / 2 ? '-100%' : '0';

  return {
    top: clientY,
    left: clientX,
    transform: `translate(${translateX}, ${translateY})`
  };
}
