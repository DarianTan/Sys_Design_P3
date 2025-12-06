import GameList from "../components/GameList";
import DealsList from "../components/DealsList";

function Home() {
  return (
    <main className="app-container">
      <header className="app-header">
        <h1>FreePlay Quest</h1>
        <p className="app-subtitle">
          Discover free-to-play games and find great deals on premium titles.
        </p>
      </header>

      <section className="app-section">
        <h2>Free Games</h2>
        <GameList />
      </section>

      <section className="app-section">
        <h2>Game Deals</h2>
        <DealsList />
      </section>
    </main>
  );
}

export default Home;
