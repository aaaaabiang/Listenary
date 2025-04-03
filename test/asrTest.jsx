import { useEffect } from "react";
import { speechToText } from "../src/speechToText";
import { PROXY_URL } from "../src/apiConfig";

export function AsrTest() {
  useEffect(function () {
    console.log("AsrTest Component Mounted"); // 检查是否进入 useEffect
    // const audioUrl = "https://crbn.us/whatstheweatherlike.wav";
    const proxyUrl = `${PROXY_URL}/proxy?url=${encodeURIComponent(audioUrl)}`;

    // 下载音频并进行转写
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
        speechToText(params);
      })
      .catch(function (error) {
        console.error("Fail", error.message);
      });
  }, []); // 空数组确保只在组件挂载时执行一次

  return <div>ASR Test Running...</div>;
}
