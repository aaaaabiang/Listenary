import { resolvePromise } from "./resolvePromise.js";
import { speechToText } from "./speechToText.js";

export const model = {
  audioUrl: "",
  transcripResults: [],
  transcripResultsPromiseState: "",

  setResults(results) {
    this.transcripResults = results;
  },
  setAudioUrl(url) {
    this.audioUrl = url;
  },

  //store asr api result in transcrip result promise state
  getTranscription(params) {
    resolvePromise(speechToText(params), transcripResultsPromiseState);
  },
};
