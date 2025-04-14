import { observer } from "mobx-react-lite";
import { PodcastPlayView } from "../views/PodcastPlayView";
import AudioPlayerPresenter from "./NewsKitPlayerPresenter";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { speechToText } from "../speechToText"; // API HERE
import { PROXY_URL } from "../apiConfig"; // 代理 URL

const PodcastPlayPresenter = observer(function PodcastPlayPresenter(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const episode = location.state?.episode;

  const [isLoading, setIsLoading] = useState(false);

  // 清空转写结果，当 episode 发生变化时
  useEffect(() => {
    console.log("Episode changed, clearing transcription results.");
    props.model.setResults([]); // 清空转写结果
  }, [episode]); // 依赖 episode，当 episode 变化时触发

  // 格式化时间戳
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

  // 提取转录文本
  function getSentence(phrase) {
    return phrase.text || "No text available";
  }

  function handleTranscribe() {
    if (!episode || !episode.audioUrl) {
      alert("Invalid episode data");
      return;
    }

    // 如果已有转写结果，则不重复请求 API
    if (
      props.model.transcripResults &&
      props.model.transcripResults.length > 0
    ) {
      console.log("Transcription already exists, skipping API request.");
      alert("This episode has already been transcribed.");
      return;
    }
    setIsLoading(true);

    // 创建 Audio 对象并检测音频长度
    const audio = new Audio(episode.audioUrl);
    audio.addEventListener("loadedmetadata", function () {
      const duration = audio.duration; // 获取音频时长（单位：秒）
      if (duration > 300) {
        alert(
          "please select a shorter espisode less than 5 minutes to save usage for us :)"
        );
        setIsLoading(false);
        return;
      }

      props.model.setAudioDuration(duration);

      if (props.model.audioFile) {
        console.log("Using existing audio file:", props.model.audioFile); // 添加日志
        // 如果音频文件已存在，直接调用转录 API
        transcribeAudio(props.model.audioFile);
      } else {
        console.log("Downloading audio file...");
        // 如果音频文件不存在，下载并存储
        downloadAndStoreAudioFile(episode.audioUrl)
          .then(function (audioFile) {
            props.model.setAudioFile(audioFile); // 存储下载的音频文件
            transcribeAudio(audioFile); // 调用转录 API
          })
          .catch(function (error) {
            console.error("下载音频文件失败：", error.message);
            alert("音频下载失败，请稍后重试！");
          })
          .finally(function () {
            setIsLoading(false);
          });
      }
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
        var audioFile = new File([blob], "audio.wav", { type: blob.type });
        console.log("Downloaded audio file:", audioFile); // 添加日志
        return audioFile; // 返回音频文件
      });
  }

  //request transcription api
  function transcribeAudio(audioFile) {
    if (!audioFile) {
      console.error("No audio file provided to transcribeAudio");
      alert("音频文件无效，请稍后重试！");
      return;
    }

    const params = {
      audio: audioFile,
      definition: JSON.stringify({ locales: ["en-US"] }),
    };

    console.log("Calling speechToText with params:", params); // 添加日志

    speechToText(params)
      .then(saveTranscripDataACB)
      .catch(function (error) {
        console.error("转录失败：", error.message);
        alert("转录失败，请稍后重试！");
      });
  }

  // 处理转录结果，生成带时间戳和文本的数组
  function processTranscriptionData() {
    const results = [];
    for (let i = 0; i < props.model.transcripResults.length; i++) {
      const phrase = props.model.transcripResults[i];
      results.push({
        timestamp: getTimestamp(phrase),
        text: getSentence(phrase),
      });
    }
    return results;
  }

  const processedTranscriptionData = processTranscriptionData();

  function saveTranscripDataACB(data) {
    if (data) {
      // 添加而不是替换
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

  //back to channel page
  function handleBack() {
    navigate("/podcast-channel");
  }
  if (!episode) {
    return (
      <div style={{ padding: "2rem" }}>
        {" "}
        <p>No episode data</p> <button onClick={handleBack}>← Back</button>{" "}
      </div>
    );
  }

  function getPodcastData() {
    return {
      title: episode.title,
      description: episode.description,
      audioUrl: episode.audioUrl,
      duration: episode.duration,
      source: props.model?.podcastChannelInfo?.title || "Podcast",
      coverImage: Array.isArray(episode.coverImage)
        ? episode.coverImage[0]
        : episode.coverImage,
    };
  }

  const wordCard = {
    word: "leadership",
    phonetics: {
      uk: "/ˈliː.də.ʃɪp/",
      us: "/ˈliː.dɚ.ʃɪp/",
    },
    definition:
      "The quality of being good at leading a group, organization, country, etc.",
    examples: [
      "She showed strong leadership during the crisis.",
      "The company needs better leadership.",
      "Under her leadership, the team achieved remarkable success.",
    ],
    relatedTerms: ["lead", "leader", "leading"],
  };

  function handleWordSelect(word) {
    console.log("Selected word:", word);
  }

  return (
    <PodcastPlayView
      podcastData={getPodcastData()}
      transcriptionData={processedTranscriptionData}
      wordCard={wordCard}
      AudioPlayer={AudioPlayerPresenter}
      onWordSelect={handleWordSelect}
      onTranscribe={handleTranscribe}
      isLoading={isLoading}
    />
  );
});

export default PodcastPlayPresenter;
