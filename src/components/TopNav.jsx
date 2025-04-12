import '../styles/TopNav.css';

export function TopNav() {
  return (
    <nav className="top-nav">
      <div className="nav-container">
        <a href="/#/" className="brand-link">Listenary</a>
        <div className="nav-links">
          <a href="/#/wordlist" className="nav-link">Wordlist</a>
          <a href="/#/login" className="nav-link">Login</a>
        </div>
      </div>
    </nav>
  );
} 