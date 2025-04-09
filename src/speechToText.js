// import { model } from "./Model.js";
import { model } from "./Model.js";
import { AZURE_API_URL, PROXY_KEY } from "./apiConfig.js";

export function speechToText(params) {
  // 创建 FormData 对象来存储音频文件和定义参数
  const formData = new FormData();
  if (params.audio) {
    formData.append("audio", params.audio); // Appends "audio" as a new parameter.
  }
  if (params.definition) {
    formData.append("definition", params.definition); // Appends "definition" as a new parameter.
  } //send request
  return fetch(
    AZURE_API_URL +
      "/speechtotext/transcriptions:transcribe?api-version=2024-11-15", // new url
    {
      method: "POST",
      headers: { "Ocp-Apim-Subscription-Key": PROXY_KEY },
      body: formData,
    }
  )
    .then(gotResponseACB) //convert raedata to json
    .catch(function (error) {
      console.error("Fail to upload or transcribe", error.message);
    });

  function gotResponseACB(response) {
    if (response.status != 200) throw new Error(response.status);
    return response.json(); // Deserialization of the response data
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
