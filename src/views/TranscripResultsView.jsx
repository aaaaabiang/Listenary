export function TranscripResultsView(props) {
  console.log("页面显示的转写结果:", props.transcripResults);
  return (
    <div>
      <h3>Transcription</h3>
      <div>{props.transcripResults}</div>
    </div>
  );
}
