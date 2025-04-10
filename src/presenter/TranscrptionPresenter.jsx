import { observer } from "mobx-react-lite";
import { TranscripResultsView } from "../views/TranscripResultsView.jsx";
import { TranscripInputView } from "../views/TranscripInputView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";
import { speechToText } from "../speechToText.js";
import { PROXY_URL } from "../apiConfig.js";
//import autio player
import AudioPlayerPresenter from "../presenter/NewsKitPlayerPresenter";
import { NewsKitProvider, newskitLightTheme, TitleBar, Block } from "newskit";

const Transcription = observer(function TranscripRender(props) {
  console.log("Transcription:", props.model.transcripResults);
  console.log("Audio URL: ", props.model.audioUrl);
  return (
    //use a boolean expression {data && A || B}, where data is from the promise state, A=the search results and B= the suspense
    //if data == true return A, if data ==null/undefine return B.
    <div>
      <div className="transcription-page">
        {/* transcription */}
        <div className="transcription-input">
          <TranscripInputView
            url={props.url}
            onInputChange={inputHandlerACB}
            onSubmit={submitHandlerACB}
          />
        </div>

        <div className="transcription-results">
          <TranscripResultsView
            transcripResults={props.model.transcripResults}
            getTimestamp={getTimestamp}
            getSentence={getSentence}
          />
        </div>

        <div className="audio-player-container">
          {/* audioplayer */}
          <NewsKitProvider theme={newskitLightTheme}>
            <div
              style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}
            >
              <AudioPlayerPresenter audioSrc={props.model.audioUrl} />
            </div>
          </NewsKitProvider>
        </div>
      </div>
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
        speechToText(params).then(saveTranscripDataACB); //保存结果;
      })
      .catch(function (error) {
        console.error("Fail", error.message);
      });
  }

  //save transcription result
  function saveTranscripDataACB(data) {
    if (data) {
      //add rather than replace
      for (let i = 0; i < data.phrases.length; i++) {
        const updatedResults = [
          ...props.model.transcripResults,
          ...data.phrases,
        ];
        props.model.setResults(updatedResults);
      }
    } else {
      console.log("API返回空数据");
    }
  }

  // format timestamp as hh:mm:ss
  function getTimestamp(phrase) {
    const totalMilliseconds = phrase.offsetMilliseconds || 0;
    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
      2,
      "0"
    );
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  //extract the sentence text
  function getSentence(phrase) {
    return phrase.text || "No text available";
  }
});

export { Transcription };
