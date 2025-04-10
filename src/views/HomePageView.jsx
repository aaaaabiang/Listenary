import '../styles/HomePage.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

  {/* export function HomePageView({ onRssSubmit }) {
  const navigate = useNavigate();
  const [rssUrl, setRssUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 直接导航到播客频道页面，使用默认的 RSS URL
    navigate('/podcast-channel');
  }; */}

export function HomePageView(props) {

  {/*const handleSubmitAndNavigate = () => {
    if (props.onSubmit) props.onSubmit();  // 触发 Transcription 中的 submitHandlerACB
    console.log("props.onSubmit", props.onSubmit);
    window.location.hash = 'transcription'; // 立即跳转
  };*/}

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // 同时执行提交逻辑和导航
    if (props.onSubmit) props.onSubmit();
    navigate('/Transcription'); // 使用React Router的标准导航方式
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
          className="search-input"  // 保持main的样式类名
          placeholder="Input RSS link to get podcast transcription"
          value={props.url}
          onChange={props.onInputChange}
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
          {/* 保持main的编号展示样式 */}
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

