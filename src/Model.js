import { resolvePromise } from "./resolvePromise.js";
import { speechToText } from "./speechToText.js";

export const model = {
  audioUrl: "",
  transcripResults: [],
  transcripResultsPromiseState: "",

  setResults(results) {
    this.transcripResults = [].concat(results); //MobX 中，直接赋值代理数组会导致更新失败。
  },
  setAudioUrl(url) {
    this.audioUrl = url;
  },

  //store asr api result in transcrip result promise state
  getTranscription(params) {
    resolvePromise(speechToText(params), transcripResultsPromiseState);
  },
};
