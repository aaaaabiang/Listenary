import '../styles/Wordlist.css';
import { TopNav } from '../components/TopNav';

export function WordlistView({ wordlists, selectedWordlist, onWordlistSelect, words }) {
  return (
    <div className="page-container">
      <TopNav />
      <div className="wordlist-container">
        {/* Left sidebar - Wordlist menu */}
        <div className="wordlist-sidebar">
          <h2 className="sidebar-title">My Wordlists</h2>
          <div className="wordlist-list">
            {wordlists.map(list => (
              <div 
                key={list.id}
                className={`wordlist-item ${selectedWordlist === list.name ? 'selected' : ''}`}
                onClick={() => onWordlistSelect(list.name)}
              >
                <span className="wordlist-name">{list.name}</span>
                <span className="wordlist-count">{list.count} words</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right content - Word list */}
        <div className="wordlist-content">
          <h2 className="content-title">{selectedWordlist}</h2>
          <div className="word-list">
            {words.map((word, index) => (
              <div key={index} className="word-item">
                <div className="word-text">{word.word}</div>
                <div className="word-phonetics">
                  <span className="phonetic">UK {word.phonetics.en}</span>
                  <span className="phonetic">US {word.phonetics.us}</span>
                </div>
                <div className="word-definition">{word.definition}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 