import { observer } from "mobx-react-lite";
import { TranscripResultsView } from "../views/TranscripResultsView.jsx";
import { TranscripInputView } from "../views/TranscripInputView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { speechToText } from "../speechToText.js";
import { PROXY_URL } from "../apiConfig.js";

const Transcription = observer(function TranscripRender(props) {
  // console.log("TranscriptionPresenter Rendered");
  console.log("Audio URL: ", props.model.audioUrl);
  return (
    //use a boolean expression {data && A || B}, where data is from the promise state, A=the search results and B= the suspense
    //if data == true return A, if data ==null/undefine return B.
    <div>
      <TranscripInputView
        url={props.url}
        onInputChange={inputHandlerACB}
        onSubmit={submitHandlerACB}
      />
      <TranscripResultsView transcripResults={props.model.transcripResults} />
    </div>
  );

  //input handler, set audio url in model as input
  function inputHandlerACB(event) {
    const url = event.target.value;
    props.model.setAudioUrl(url);
  }

  //submit handler, use the set url to request api
  function submitHandlerACB() {
    fetchAndTranscribe(props.model.audioUrl);
  }

  //url process & api request
  function fetchAndTranscribe(audioUrl) {
    const proxyUrl = `${PROXY_URL}/proxy?url=${encodeURIComponent(audioUrl)}`;
    fetch(proxyUrl)
      .then(function (response) {
        if (response.status !== 200) throw new Error(response.status);
        return response.blob();
      })
      .then(function (blob) {
        var audioFile = new File([blob], "audio.wav", { type: blob.type });
        var params = {
          audio: audioFile,
          definition: JSON.stringify({ locales: ["en-US"] }),
        };
        // 请求语音转文本 API
        speechToText(params).then(resultUpdateACB);
      })
      .catch(function (error) {
        console.error("Fail", error.message);
      });
  }

  function resultUpdateACB(result) {
    console.log("API returned result: ", result);
    props.model.setResults(result);
  }
});

export { Transcription };
