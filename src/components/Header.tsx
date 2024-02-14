import { forwardRef } from 'react';
import formatTime from '../utils/formatTime';

type HeaderProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
  time: number;
};

const Header = forwardRef<HTMLElement, HeaderProps>(
  ({ setStartGame, time }, ref) => {
    const onLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      setStartGame(false);
    };

    return (
      <header ref={ref}>
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
    );
  }
);

export default Header;
