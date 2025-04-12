import '../styles/PodcastPlay.css';
import { NewsKitProvider, newskitLightTheme } from "newskit";
import { useState, useCallback } from 'react';
import { Select, MenuItem, FormControl } from '@mui/material';

export function PodcastPlayView({ podcastData, AudioPlayer, transcriptionData = [], onWordSelect }) {
  const [selectedText, setSelectedText] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictionaryPosition, setDictionaryPosition] = useState(null);
  const [targetLanguage, setTargetLanguage] = useState('zh'); // 默认中文

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
    // TODO: 触发重新翻译的逻辑
  };

  const handleTextSelection = useCallback(() => {
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      
      // 计算浮窗位置，显示在选中文本的右上方
      const position = {
        top: Math.max(10, rect.top), // 确保不超出顶部
        left: rect.right + 10 // 右侧偏移10px
      };
      
      // 检查是否会超出右侧边界
      const windowWidth = window.innerWidth;
      if (position.left + 320 > windowWidth) { // 320px 是浮窗宽度
        position.left = rect.left - 330; // 左侧显示，预留10px间距
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
    // 这里添加将单词添加到生词本的逻辑
    console.log('Adding to wordlist:', selectedText);
    // TODO: 实现添加到生词本的功能
  }, [selectedText]);

  return (
    <div className="podcast-play-page">
      {/* Top Navigation */}
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
              <FormControl size="small">
                <Select
                  value={targetLanguage}
                  onChange={handleLanguageChange}
                  className="language-select"
                  variant="outlined"
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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

      {showDictionary && (
        <div className="dictionary-overlay" onClick={handleOverlayClick}>
          <div 
            className="dictionary-card"
            style={dictionaryPosition}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="word-header">
              <h2 className="word-text">{selectedText}</h2>
              <div className="word-level">B1</div>
            </div>
            <div className="word-phonetics">
              <div className="phonetic">
                <span className="phonetic-label">英</span>
                <span className="phonetic-text">/example/</span>
              </div>
              <div className="phonetic">
                <span className="phonetic-label">美</span>
                <span className="phonetic-text">/example/</span>
              </div>
            </div>
            <div className="word-definition">
              <p>Example definition for the selected word or phrase.</p>
            </div>
            <div className="word-examples">
              <p className="example">Example usage of the selected word.</p>
            </div>
            <button 
              className="add-to-wordlist-btn"
              onClick={handleAddToWordlist}
            >
              Add to Wordlist
            </button>
          </div>
        </div>
      )}

      {/* Bottom Audio Player */}
      <div className="bottom-audio-player">
        <NewsKitProvider theme={newskitLightTheme}>
          <AudioPlayer audioSrc={podcastData.audioUrl} />
        </NewsKitProvider>
      </div>
    </div>
  );
} 
