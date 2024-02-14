import imgSrc from '../assets/waldo.jpeg';
import '../assets/styles/game.css';

type GameProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Game({ setStartGame }: GameProps) {
  const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setStartGame(false);
  };

  return (
    <>
      <header>
        <a
          href="/"
          className="logo"
          onClick={onLogoClick}
          aria-label="Go back to home page"
        >
          Where's Waldo
        </a>

        <span>4:20</span>
      </header>

      <main className="game">
        <img src={imgSrc} alt="Where's Waldo picture" />
      </main>
    </>
  );
}
