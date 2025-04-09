import { getTimestamp, getSentence } from "../speechToText";

import "../styles/Transcription.css";

export function TranscripResultsView(props) {
  console.log(
    "页面显示的转写结果:",
    getTimestamp(props.transcripResults),
    getSentence(props.transcripResults)
  );

  //render results by sentence row
  function SentenceRowCB() {
    return (
      <tr className="transcription-text">
        <td>{getTimestamp(props.transcripResults)}</td>
        <td>{getSentence(props.transcripResults)}</td>
      </tr>
    );
  }
  return (
    <div className="transcription-section results-section">
      <h3>Transcription</h3>
      <table>
        <thead>
          <tr>
            <th>timestamp</th>
            <th>text</th>
          </tr>
        </thead>
        <tbody>{props.transcripResults.map(SentenceRowCB)}</tbody>
      </table>
    </div>
  );
}
