import { useEffect, useState, useMemo } from "react";
import GameCard from "./GameCard";

function GameList() {
  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [showAll, setShowAll] = useState(false); // NEW: controls how many to show

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await fetch("https://www.freetogame.com/api/games");
        const data = await response.json();
        console.log("FreeToGame API data:", data);
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    }

    fetchGames();
  }, []);

  // Collect unique genres from the data
  const genres = useMemo(() => {
    const uniqueGenres = new Set();
    games.forEach((game) => {
      if (game.genre) {
        uniqueGenres.add(game.genre);
      }
    });
    return ["All", ...Array.from(uniqueGenres).sort()];
  }, [games]);

  // Filtered games based on search + genre
  const filteredGames = games.filter((game) => {
    const matchesGenre =
      selectedGenre === "All" || game.genre === selectedGenre;

    const matchesSearch =
      searchTerm.trim() === "" ||
      game.title.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesGenre && matchesSearch;
  });

  // Decide how many to show at once
  const visibleGames = showAll ? filteredGames : filteredGames.slice(0, 6);

  const showSeeMoreButton = !showAll && filteredGames.length > 6;

  return (
    <div>
      {/* Filter controls */}
      <div className="game-filters">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowAll(false); // reset view when filters change
          }}
          className="game-filters__search"
        />

        <select
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(e.target.value);
            setShowAll(false); // reset view when filters change
          }}
          className="game-filters__select"
        >
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre === "All" ? "All Genres" : genre}
            </option>
          ))}
        </select>
      </div>

      {/* Game cards grid (limited at first) */}
      <div className="game-grid">
        {visibleGames.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* See more button */}
      {showSeeMoreButton && (
        <div className="game-see-more-wrapper">
          <button
            type="button"
            className="game-see-more-button"
            onClick={() => setShowAll(true)}
          >
            See more games
          </button>
        </div>
      )}

      {/* (Optional) If you want a "no results" message */}
      {filteredGames.length === 0 && (
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#9ca3af" }}>
          No games found. Try a different title or genre.
        </p>
      )}
    </div>
  );
}

export default GameList;
