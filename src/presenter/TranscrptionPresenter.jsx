import { observer } from "mobx-react-lite";
import { reaction } from "mobx";
import { TranscripResultsView } from "../views/TranscripResultsView.jsx";
import { TranscripInputView } from "../views/TranscripInputView.jsx";
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

  // useEffect(() => {
  //   if (props.model.audioUrl) {
  //     fetchAndTranscribe(props.model.audioUrl);
  //   }
  // }, [props.model.audioUrl]);

  let isProcessing = false; // 添加状态标志
  // 使用 reaction 监听 audioUrl 的变化
  reaction(isAudioUrlChangeACB, audioUrlChangeEffectACB);

  return (
    <div>
      <div className="transcription-page">
        {/* transcription */}
        <div className="transcription-input">
          <TranscripInputView
            url={props.model.audioUrl}
            onInputChange={inputHandlerACB}
            onSubmit={submitHandlerACB}
          />
        </div>
        {/* Only render the transcription results and audio player */}
        <div className="transcription-results" id="transcription">
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
  function submitHandlerACB() {
    const audioUrl = props.model.audioUrl; // 从 model 中获取 audioUrl
    if (!audioUrl) {
      alert("请输入有效的音频 URL！");
      return;
    }
    downloadAndStoreAudioFile(audioUrl).catch(function (error) {
      alert("音频下载失败，请检查 URL 是否正确！");
      console.error("下载音频文件失败：", error.message);
    });
  }
  //download audio file from url
  function downloadAndStoreAudioFile(audioUrl) {
    const proxyUrl = `${PROXY_URL}/proxy?url=${encodeURIComponent(audioUrl)}`;
    return fetch(proxyUrl)
      .then(function (response) {
        if (response.status !== 200) throw new Error(response.status);
        return response.blob();
      })
      .then(function (blob) {
        const audioFile = new File([blob], "audio.wav", { type: blob.type });
        props.model.setAudioFile(audioFile); // 将音频文件存储到 model
        return audioFile;
      });
  }
  //submit handler, use the set url to request api

  //observer if audioUrl is changed
  function isAudioUrlChangeACB() {
    return props.model.audioUrl;
  }
  //request transcription api
  function transcribeAudio(audioFile) {
    const params = {
      audio: audioFile,
      definition: JSON.stringify({ locales: ["en-US"] }),
    };
    speechToText(params).then(saveTranscripDataACB);
  }

  // side effect when audioUrl changes
  function audioUrlChangeEffectACB(audioUrl) {
    if (!audioUrl || isProcessing) return;

    isProcessing = true; // 设置状态为正在处理

    // 创建 Audio 对象并检测音频长度
    const audio = new Audio(audioUrl);
    audio.addEventListener("loadedmetadata", function () {
      const duration = audio.duration; // 获取音频时长（单位：秒）
      if (duration > 300) {
        alert("音频长度过长，请选择小于5分钟的音频！");
        props.model.setAudioUrl(""); // 清空输入框内容
        isProcessing = false; // 重置状态
        return; // 终止后续流程
      }

      // 如果音频长度符合要求，存储时长并继续后续流程
      props.model.setAudioDuration(duration);

      if (props.model.audioFile) {
        //if audio file is already stored
        transcribeAudio(props.model.audioFile);
        isProcessing = false; // 重置状态
      } else {
        // 如果音频文件不存在，下载并存储
        downloadAndStoreAudioFile(audioUrl)
          .then(function (audioFile) {
            props.model.setAudioFile(audioFile); // 存储下载的音频文件
            transcribeAudio(audioFile); // 调用转录 API
            isProcessing = false; // 重置状态
          })
          .catch(function () {
            isProcessing = false;
          });
      }
    });
  }

  // //url process & api request
  // function fetchAndTranscribe(audioUrl) {
  //   const proxyUrl = `${PROXY_URL}/proxy?url=${encodeURIComponent(audioUrl)}`;
  //   fetch(proxyUrl)
  //     .then(function (response) {
  //       if (response.status !== 200) throw new Error(response.status);
  //       return response.blob();
  //     })
  //     .then(function (blob) {
  //       const audioFile = new File([blob], "audio.wav", { type: blob.type });
  //       const params = {
  //         audio: audioFile,
  //         definition: JSON.stringify({ locales: ["en-US"] }),
  //       };
  //       // 请求语音转文本 API
  //       speechToText(params).then(saveTranscripDataACB); //保存结果;
  //     })
  //     .catch(function (error) {
  //       console.error("Fail", error.message);
  //     });
  // }

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
