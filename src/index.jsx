// TODO make a reactive model, set it to window.myModel
import { observable } from "mobx";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot";

import { model } from "./Model";
import { speechToText } from "./speechToText";
import { PROXY_URL } from "./apiConfig";

const myModel = observable(model);
window.myModel = myModel;

createRoot(document.getElementById("root")).render(
  <ReactRoot model={myModel} />
);

const audioUrl = "https://crbn.us/whatstheweatherlike.wav";
// const audioUrl =
//   "https://anchor.fm/s/19099c28/podcast/play/11559667/https%3A%2F%2Fd3ctxlq1ktw2nl.cloudfront.net%2Fstaging%2F2020-2-26%2F59157286-44100-2-83fd7d33224513da.mp3";
const proxyUrl = `${PROXY_URL}/proxy?url=${encodeURIComponent(audioUrl)}`;

//download audio from url
fetch(proxyUrl)
  .then(function (response) {
    if (response.status != 200) throw new Error(response.status);
    return response.blob();
  })
  .then(function (blob) {
    var audioFile = new File([blob], "audio.wav", { type: blob.type });

    var params = {
      audio: audioFile,
      definition: JSON.stringify({ locales: ["en-US"] }),
    };

    //request speech to text API
    speechToText(params);
  })
  .catch(function (error) {
    console.error("Fail", error.message);
  });
