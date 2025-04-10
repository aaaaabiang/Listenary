import { observer } from "mobx-react-lite";
import { TranscripResultsView } from "../views/TranscripResultsView.jsx";
import "../styles/Transcription.css";
import { speechToText } from "../speechToText.js";
import { PROXY_URL } from "../apiConfig.js";
import AudioPlayerPresenter from "../presenter/NewsKitPlayerPresenter";
import { NewsKitProvider, newskitLightTheme, TitleBar, Block } from "newskit";
import { useEffect } from "react";

const Transcription = observer(function TranscripRender(props) {
  console.log("Transcription:", props.model.transcripResults);
  console.log("Audio URL: ", props.model.audioUrl);

  useEffect(() => {
    if (props.model.audioUrl) {
      fetchAndTranscribe(props.model.audioUrl);
    }
  }, [props.model.audioUrl]);

  return (
    <div className="transcription-page">
      {/* transcription results */}
      <div className="transcription-results" id="transcription">
        <TranscripResultsView
          transcripResults={props.model.transcripResults}
          getTimestamp={getTimestamp}
          getSentence={getSentence}
        />
      </div>
      {/* Audioplayer */}
      <NewsKitProvider theme={newskitLightTheme}>
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
          <TitleBar>NewsKit Audio Player Demo</TitleBar>
          <AudioPlayerPresenter audioSrc={props.model.audioUrl} />
        </div>
      </NewsKitProvider>
    </div>
  );

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
