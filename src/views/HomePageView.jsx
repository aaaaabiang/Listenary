import '../styles/HomePage.css';

export function HomePageView(props) {

  // const handleSubmitAndNavigate = () => {
  //   if (props.onSubmit) props.onSubmit();  // 触发 Transcription 中的 submitHandlerACB
  //   console.log("props.onSubmit", props.onSubmit);
  //   window.location.hash = 'transcription'; // 立即跳转
  // };

  return (
    <div className="homepage-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Listenary" className="logo" />
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          value={props.url}
          onChange={props.onInputChange}  // input 改变时才需要这个
          className="transcription-section"
          placeholder="Input RSS link to get podcast transcription"
        />
        <span className="search-icon">
          <button onClick={() => {
            props.onSubmit();
            props.onNavigate(); 
          }}>
            🔍
          </button>
        </span>
      </div>

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
          <div className="saved-item"><span className="item-number">1st</span></div>
          <div className="saved-item"><span className="item-number">2nd</span></div>
          <div className="saved-item"><span className="item-number">3rd</span></div>
          <div className="saved-item"><span className="item-number">4th</span></div>
        </div>

        <a href="#" className="show-more">Show more</a>
      </div>
    </div>
  );
}
