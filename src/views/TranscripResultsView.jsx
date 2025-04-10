import { getTimestamp, getSentence } from "../speechToText";

import "../styles/Transcription.css";

export function TranscripResultsView(props) {
  console.log(
    "页面显示的转写结果:",
    getTimestamp(props.transcripResults),
    getSentence(props.transcripResults)
  );

  //render results by sentence row
  function SentenceRowCB(phrase, index) {
    return (
      <tr key={index} className="transcription-text">
        <td>{props.getTimestamp(phrase)}</td>
        <td>{props.getSentence(phrase)}</td>
      </tr>
    );
  }
  return (
    <div className="transcription-section results-section">
      <h3 className="transcription-title">Transcription</h3>
      <div className="results-container">
        <table className="results-table">
          <thead>
            <tr>
              <th>Timestamp</th>
              <th>Text</th>
            </tr>
          </thead>
          <tbody>
            {props.transcripResults.length > 0 ? (
              props.transcripResults.map(SentenceRowCB)
            ) : (
              <tr>
                {" "}
                <td colSpan="2" className="no-results">
                  {" "}
                  No transcription results available.
                </td>{" "}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
