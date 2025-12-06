function GameDetails({ game }) {
  if (!game) return null;

  return (
    <div>
      <h2>{game.title}</h2>
      <p>{game.description}</p>
    </div>
  );
}

export default GameDetails;
