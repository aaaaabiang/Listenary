import '../styles/HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function HomePageView({ onRssSubmit }) {
  const navigate = useNavigate();
  const [rssUrl, setRssUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 直接导航到播客频道页面，使用默认的 RSS URL
    navigate('/podcast-channel');
  };

  return (
    <div className="homepage-container">
      <nav className="top-nav">
        <div className="nav-links">
          <a href="/#/wordlist" className="nav-link">Wordlist</a>
          <a href="/#/login" className="nav-link">Login</a>
        </div>
      </nav>
      
      <div className="logo-container">
        <img src="/logo.png" alt="Listenary" className="logo" />
      </div>
      
      <form className="search-container" onSubmit={handleSubmit}>
        <input 
          type="text" 
          className="search-input"
          placeholder="Search for podcasts"
          value={rssUrl}
          onChange={(e) => setRssUrl(e.target.value)}
        />
        <button type="submit" className="search-button">
          <span className="search-icon">🔍</span>
        </button>
      </form>

      <a href="#" className="help-link">
        How to get RSS link for podcast? →
      </a>

      <div className="saved-section">
        <div className="saved-header">
          <h2 className="saved-title">
            <img src="/saved-icon.png" alt="" className="saved-icon" />
            Saved
          </h2>
        </div>

        <div className="saved-grid">
          {/* Placeholder for saved items */}
          <div className="saved-item">
            <span className="item-number">1st</span>
          </div>
          <div className="saved-item">
            <span className="item-number">2nd</span>
          </div>
          <div className="saved-item">
            <span className="item-number">3rd</span>
          </div>
          <div className="saved-item">
            <span className="item-number">4th</span>
          </div>
        </div>

        <a href="#" className="show-more">Show more</a>
      </div>
    </div>
  );
}

