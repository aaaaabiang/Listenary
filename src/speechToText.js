// import { model } from "./Model.js";
import { model } from "./Model.js";
import { AZURE_API_URL, PROXY_KEY } from "./apiConfig.js";

// export function speechToText(params) {
// 原方法重写：将 FormData 替换为 JSON 请求体，使用音频 URL
export function speechToText(params) {

  // 改动 1：检查传入是否是 url（string），而不是本地 audio 文件
  const { url } = params;
  if (!url) {
    console.error("❌ No audio URL provided to speechToText");
    return Promise.reject("No URL");
  }


  // 改动 2：使用 fetch 发送 JSON 格式的请求，而不是 FormData
  // 创建 FormData 对象来存储音频文件和定义参数
  // const formData = new FormData();
  // if (params.audio) {
  //   formData.append("audio", params.audio); // Appends "audio" as a new parameter.
  // }
  // if (params.definition) {
  //   formData.append("definition", params.definition); // Appends "definition" as a new parameter.
  // } //send request
  // return fetch(
  //   AZURE_API_URL +
  //     "/speechtotext/transcriptions:transcribe?api-version=2024-11-15", // new url
  //   {
  //     method: "POST",
  //     headers: { "Ocp-Apim-Subscription-Key": PROXY_KEY },
  //     body: formData,
  //   }
  // )
  return fetch(
    AZURE_API_URL +
      "/speechtotext/transcriptions:transcribe?api-version=2024-11-15", // 保留确认版本号
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",                       // 改动 3：设置为 JSON 类型
        "Ocp-Apim-Subscription-Key": PROXY_KEY
      },
      body: JSON.stringify({
        contentUrls: [url],                                       // 改动 4：符合 Azure 要求的字段
        locale: "en-US",                                          // 改动 5：添加必需字段
        displayName: "Podcast Transcription"                      // 改动 6：添加可读名称
      })
    }
  )
    .then(gotResponseACB) //convert raedata to json
    .catch(function (error) {
      console.error("Fail to upload or transcribe", error.message);
    });

  function gotResponseACB(response) {
    // 改动 7：检查 status，更友好地报错
    if (!response.ok) throw new Error(`Transcription API failed: ${response.status}`);
    return response.json(); 
  }
}

//get timestamp (problem remain)
export function getTimestamp(result) {
  for (let i = 0; i < result.length; i++) {
    return result[i].durationMilliseconds;
  }
}
//get split sentence
export function getSentence(result) {
  for (let i = 0; i < result.length; i++) {
    return result[i].text;
  }
}
