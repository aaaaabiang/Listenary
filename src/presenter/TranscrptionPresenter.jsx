import { observer } from "mobx-react-lite";
import { TranscripResultsView } from "../views/TranscripResultsView.jsx";
//import { TranscripInputView } from "../views/TranscripInputView.jsx";
import { HomePageView } from "../views/HomePageView.jsx";
import "../styles/Transcription.css";
import { SuspenseView } from "../views/suspenseView.jsx";
import { speechToText } from "../speechToText.js";
import { PROXY_URL } from "../apiConfig.js";
//import autio player
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
    <div>
      {/* Only render the transcription results and audio player */}
      <div id="transcription">
        <TranscripResultsView transcripResults={props.model.transcripResults} />
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
      for (let i = 0; i < data.phrases.length; i++) {
        const transcript = data.phrases[i] || "no results";
        props.model.setResults(transcript);
      }
    } else {
      console.log("API返回空数据");
    }
  }
});

export { Transcription };
