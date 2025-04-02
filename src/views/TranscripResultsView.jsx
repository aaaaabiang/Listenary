export function TranscripResultsView(props) {
  console.log("Rendering Transcription:", props.transcripResults);
  return (
    <div>
      <h3>Transcription</h3>
      <div>Transcription result: {props.transcripResults}</div>
    </div>
  );
}
