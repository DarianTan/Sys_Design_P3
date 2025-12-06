import Home from "./pages/Home";
import "./styles/main.css";

function App() {
  return (
    <div className="app-root">
      <header className="top-nav">
        <div className="top-nav__inner">
          <div className="top-nav__brand">
            <span className="top-nav__logo-dot" />
            <span className="top-nav__logo-text">FreePlay Labs</span>
          </div>

          <nav className="top-nav__links">
            <a href="#free-games">Free Games</a>
            <a href="#game-deals">Game Deals</a>
          </nav>
        </div>
      </header>

      <Home />

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} FreePlay Labs · Prototype experience for research & learning.</p>
      </footer>
    </div>
  );
}

export default App;
