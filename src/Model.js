import { resolvePromise } from "./resolvePromise.js";
import { speechToText } from "./speechToText.js";

export const model = {
  audioUrl: "",
  audioFile: null, // store audio file
  transcripResults: [],
  transcripResultsPromiseState: "",

  setAudioUrl(url) {
    this.audioUrl = url;
  },
  setAudioFile(file) {
    this.audioFile = file;
  },

  setAudioDuration(duration) {
    this.audioDuration = duration;
  },
  setResults(results) {
    this.transcripResults = [].concat(results); //MobX 中，直接赋值代理数组会导致更新失败。
  },
  //store asr api result in transcrip result promise state
  getTranscription(params) {
    resolvePromise(speechToText(params), transcripResultsPromiseState);
  },
};
