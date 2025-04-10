import '../styles/PodcastPlay.css';
import { NewsKitProvider, newskitLightTheme } from "newskit";

export function PodcastPlayView({ podcastData, wordCard, AudioPlayer }) {
  return (
    <div className="podcast-play-page">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-links">
          <a href="/#/wordlist" className="nav-link">Wordlist</a>
          <a href="/#/login" className="nav-link">Login</a>
        </div>
      </nav>

      <div className="podcast-play-content">
        {/* Left Section - Podcast Info */}
        <div className="content-section">
          <div className="podcast-info">
            <h1 className="podcast-title">{podcastData.title}</h1>
            <p className="podcast-description">{podcastData.description}</p>
            <div className="podcast-meta">
              <span className="podcast-source">{podcastData.source}</span>
              <span className="podcast-duration">{podcastData.duration}</span>
            </div>
          </div>
        </div>

        {/* Right Section - Word Card */}
        <div className="word-card">
          <div className="word-header">
            <h2 className="word-text">{wordCard.word}</h2>
            <div className="word-level">B1</div>
          </div>

          <div className="word-phonetics">
            <div className="phonetic">
              <span className="phonetic-label">UK</span>
              <span className="phonetic-text">{wordCard.phonetics.uk}</span>
            </div>
            <div className="phonetic">
              <span className="phonetic-label">US</span>
              <span className="phonetic-text">{wordCard.phonetics.us}</span>
            </div>
          </div>

          <div className="word-definition">
            <p>{wordCard.definition}</p>
          </div>

          <div className="word-examples">
            {wordCard.examples.map((example, index) => (
              <p key={index} className="example">{example}</p>
            ))}
          </div>

          <div className="related-terms">
            {wordCard.relatedTerms.map((term, index) => (
              <span key={index} className="term">{term}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Audio Player */}
      <div className="bottom-audio-player">
        <NewsKitProvider theme={newskitLightTheme}>
          <AudioPlayer audioSrc={podcastData.audioUrl} />
        </NewsKitProvider>
      </div>
    </div>
  );
} 