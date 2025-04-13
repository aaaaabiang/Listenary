import '../styles/PodcastPlay.css';
import { NewsKitProvider, newskitLightTheme } from "newskit";
import { useState, useCallback } from 'react';
import TranslationAPI from '../test/TranslationAPI';

export function PodcastPlayView({ podcastData, AudioPlayer, transcriptionData = [], onWordSelect }) {
  const [selectedText, setSelectedText] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translations, setTranslations] = useState({});
  const [translatingItems, setTranslatingItems] = useState(new Set());

  const languages = [
    { code: '', name: 'Choose Language' },
    { code: 'ZH-HANS', name: '中文' },
    { code: 'DE', name: 'Deutsch' },
    { code: 'SV', name: 'Svenska' },
    { code: 'FR', name: 'Français' },
    { code: 'NL', name: 'Nederlands' }
  ];

  const handleLanguageChange = async (event) => {
    const newTargetLang = event.target.value;
    setTargetLanguage(newTargetLang);
    
    if (!newTargetLang) {
      setTranslations({});
      setTranslatingItems(new Set());
      return;
    }

    // 标记所有项目为正在翻译状态
    const translatingSet = new Set(transcriptionData.map(item => item.text));
    setTranslatingItems(translatingSet);

    const newTranslations = {};
    
    // Translate each item in the transcription data
    for (const item of transcriptionData) {
      const translator = TranslationAPI({ 
        textToTranslate: item.text,
        targetLang: newTargetLang,
        onTranslationComplete: (translatedText) => {
          setTranslations(prev => ({
            ...prev,
            [item.text]: translatedText
          }));
          setTranslatingItems(prev => {
            const newSet = new Set(prev);
            newSet.delete(item.text);
            return newSet;
          });
        }
      });
      translator.translate();
    }
  };

  const handleTextSelection = useCallback(() => {
    {/*Use useCallback to prevent recreating the function on every render*/}
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

    {/* ✅ 新增封面图与简介区域 */}
    <div className="podcast-episode-summary">
      <img
        src={podcastData.coverImage}
        alt="Podcast Cover"
        className="episode-cover-image"
      />
      <p className="episode-description">{podcastData.description}</p>
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
                <div className="translation-cell">
                  {targetLanguage && (
                    translatingItems.has(item.text) ? 
                    "Loading..." : 
                    translations[item.text]
                  )}
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
