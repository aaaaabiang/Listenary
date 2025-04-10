import '../styles/PodcastChannel.css';

export function PodcastChannelView({ channelInfo, episodes, isSaved, onSave, onPlay }) {
  return (
    <div className="podcast-channel-page">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-links">
          <a href="/#/wordlist" className="nav-link">Wordlist</a>
          <a href="/#/login" className="nav-link">Login</a>
        </div>
      </nav>

      <div className="podcast-channel">
        {/* Channel Header */}
        <div className="channel-header">
          <div className="channel-cover">
            <img src={channelInfo.coverImage} alt={channelInfo.title} />
          </div>
          
          <div className="channel-info">
            <h1 className="channel-title">{channelInfo.title}</h1>
            <p className="channel-description">{channelInfo.description}</p>
            <button 
              className={`save-button ${isSaved ? 'saved' : ''}`}
              onClick={onSave}
            >
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>

        {/* Episodes List */}
        <div className="episodes-container">
          <h2 className="episodes-title">All Episodes</h2>
          <div className="episodes-list">
            {episodes.map(episode => (
              <div key={episode.id} className="episode-card">
                <div className="episode-cover">
                  <img src={episode.coverImage} alt={episode.title} />
                </div>
                
                <div className="episode-content">
                  <div className="episode-header">
                    <h3 className="episode-title">{episode.title}</h3>
                    <button 
                      className="play-button"
                      onClick={() => onPlay(episode.id)}
                    >
                      Play
                    </button>
                  </div>
                  
                  <p className="episode-description">{episode.description}</p>
                  
                  <div className="episode-meta">
                    <span className="episode-duration">{episode.duration}</span>
                    <span className="episode-date">{episode.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 