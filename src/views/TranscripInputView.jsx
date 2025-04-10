
import "../styles/Transcription.css";

export function TranscripInputView(props) {
  return (
    <div className="transcription-section">
      <h3>Audio URL</h3>
      <input type="text" value={props.url} onChange={props.onInputChange} />
      <button onClick={props.onSubmit}>Submit</button>
    </div>
  );
}
