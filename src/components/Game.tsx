import { useState, useEffect, useRef } from 'react';
import useFetch from '../utils/useFetch';
import formatTime from '../utils/formatTime';
import Header from './Header';
import Dropdown from './Dropdown';
import imgSrc from '../assets/waldo.jpeg';
import '../assets/styles/game.css';

type GameProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ setStartGame }: GameProps) {
  const [time, setTime] = useState(0);
  const { error, data, setError, setData } = useFetch();
  const [pointData, setPointData] = useState<PointData>();
  const [alert, setAlert] = useState<string>();

  const headRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!data?.polygons) return;

    const interval = setInterval(
      () => setTime(Math.floor((Date.now() - data.start) / 1000)),
      1000
    );

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

  useEffect(() => {
    if (!alert) return;
    const interval = setInterval(() => setAlert(undefined), 3000);
    return () => clearInterval(interval);
  }, [alert]);

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

  return data ? (
    <>
      <Header setStartGame={setStartGame} time={time} ref={headRef} />

      <main className={data.polygons ? 'game' : 'index'} ref={mainRef}>
        {data.polygons && (
          <>
            <img
              src={imgSrc}
              alt="Where's Waldo picture"
              onClick={onImageClick}
            />

            {pointData && (
              <Dropdown
                pointData={pointData}
                setPointData={setPointData}
                polygons={data.polygons}
                setError={setError}
                setData={setData}
                setAlert={setAlert}
              />
            )}

            {alert && <div className="alert">{alert}</div>}
          </>
        )}

        {data.end && (
          <>
            <p>{`You win! Time spent: ${formatTime(
              Math.floor((data.end - data.start) / 1000)
            )}`}</p>
          </>
        )}
      </main>
    </>
  ) : (
    <main className="index">
      {error ? (
        <>
          <h1>{error.message}</h1>
          <p>Please try again later...</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
}
