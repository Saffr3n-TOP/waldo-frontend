import '../assets/styles/index.css';

type IndexProps = {
  setStartGame: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Index({ setStartGame }: IndexProps) {
  const onStart = () => setStartGame(true);

  return (
    <main className="index">
      <h1>Where's Waldo</h1>

      <p>
        After you start the game you will be given a large picture with a lot of
        details and instructions on what exactly to look for on that picture.
        Your task is to find everything described in the instructions in as
        least amount of time as possible. Good luck!
      </p>

      <button type="button" onClick={onStart}>
        Start
      </button>
    </main>
  );
}
