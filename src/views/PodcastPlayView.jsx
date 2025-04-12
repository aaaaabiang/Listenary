import '../styles/PodcastPlay.css';
import { NewsKitProvider, newskitLightTheme } from "newskit";
import { useState, useCallback } from 'react';

export function PodcastPlayView({ podcastData, AudioPlayer, transcriptionData = [], onWordSelect }) {
  const [selectedText, setSelectedText] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('zh'); // Default to Chinese

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'de', name: 'Deutsch' },
    { code: 'sv', name: 'Svenska' },
    { code: 'fr', name: 'Français' },
    { code: 'nl', name: 'Nederlands' }
  ];

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
    // TODO: Trigger retranslation logic
  };

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // Calculate popup position, show at the top right of selected text
      const position = {
        top: Math.max(10, rect.top), // Ensure not exceeding top boundary
        left: rect.right + 10 // Offset 10px to the right
      };
      
      // Check if exceeding right boundary
      const windowWidth = window.innerWidth;
      if (position.left + 320 > windowWidth) { // 320px is popup width
        position.left = rect.left - 330; // Show on left side, leave 10px margin
      }
      
      setSelectedText(text);
      setDictionaryPosition(position);
      setShowDictionary(true);
    }
  }, []);

  const handleOverlayClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      setShowDictionary(false);
    }
  }, []);

  const handleAddToWordlist = useCallback(() => {
    // Add logic for adding word to wordlist
    console.log('Adding to wordlist:', selectedText);
    // TODO: Implement add to wordlist functionality
  }, [selectedText]);

  return (
    <div className="podcast-play-page">
      {/* Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-container">
          <a href="/#/" className="brand-link">Listenary</a>
          <div className="nav-links">
            <a href="/#/wordlist" className="nav-link">Wordlist</a>
            <a href="/#/login" className="nav-link">Login</a>
          </div>
        </div>
      </nav>

      <div className="podcast-info-header">
        <h1 className="podcast-title">{podcastData.title}</h1>
        <div className="podcast-meta">
          <span className="podcast-source">{podcastData.source}</span>
          <span className="podcast-duration">{podcastData.duration}</span>
        </div>
      </div>

      <div className={`podcast-play-content ${showDictionary ? 'dimmed' : ''}`}>
        <div className="transcript-container">
          <div className="transcript-header">
            <div className="timestamp-header">
              <h3>Timestamp</h3>
            </div>
            <div className="transcription-header">
              <h3>Transcription</h3>
            </div>
            <div className="translation-header">
              <h3>Translation</h3>
              <div className="language-select-container">
                <select
                  value={targetLanguage}
                  onChange={handleLanguageChange}
                  className="language-select"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          
          <div className="transcript-content">
            {transcriptionData.map((item, index) => (
              <div key={index} className="transcript-row">
                <div className="timestamp-cell">
                  {item.timestamp}
                </div>
                <div className="transcription-cell" onMouseUp={handleTextSelection}>
                  {item.text}
                </div>
                <div className="translation-cell" onMouseUp={handleTextSelection}>
                  {item.translation}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dictionary Card */}
      {showDictionary && (
        <>
          <div 
            className="dictionary-mask"
            onClick={() => setShowDictionary(false)}
          />
          <div 
            className="dictionary-card"
            style={{
              top: `${dictionaryPosition.top}px`,
              left: `${dictionaryPosition.left}px`
            }}
          >
            <div className="word-header">
              <h3 className="word-text">{selectedText}</h3>
              <span className="word-level">B2</span>
            </div>
            <div className="word-phonetics">
              <div className="phonetic">
                <span className="phonetic-label">UK</span>
                <span className="phonetic-text">/ˈsʌmθɪŋ/</span>
              </div>
              <div className="phonetic">
                <span className="phonetic-label">US</span>
                <span className="phonetic-text">/ˈsʌmθɪŋ/</span>
              </div>
            </div>
            <div className="word-definition">
              <p>1. used to refer to an unspecified thing</p>
              <p>2. an unspecified amount or number</p>
            </div>
            <div className="word-examples">
              <p>"I need something to eat."</p>
              <p>"There's something wrong with the car."</p>
            </div>
            <button 
              className="add-to-wordlist-btn"
              onClick={handleAddToWordlist}
            >
              Add to Wordlist
            </button>
          </div>
        </>
      )}

      {/* Audio Player */}
      <div className="bottom-audio-player">
        <NewsKitProvider theme={newskitLightTheme}>
          <AudioPlayer audioSrc={podcastData.audioUrl} />
        </NewsKitProvider>
      </div>
    </div>
  );
} 
