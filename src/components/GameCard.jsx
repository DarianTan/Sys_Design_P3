function GameCard({ game }) {
  return (
    <article className="game-card">
      <img
        src={game.thumbnail}
        alt={game.title}
        className="game-card__image"
      />

      <div className="game-card__body">
        <h3 className="game-card__title">{game.title}</h3>

        <p className="game-card__meta">
          <span>{game.genre}</span> • <span>{game.platform}</span>
        </p>

        <p className="game-card__description">
          {game.short_description}
        </p>

        <a
          href={game.game_url}
          target="_blank"
          rel="noreferrer"
          className="game-card__button"
        >
          Play Game
        </a>
      </div>
    </article>
  );
}

export default GameCard;
