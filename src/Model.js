import { resolvePromise } from "./resolvePromise.js";
import { speechToText } from "./speechToText.js";

export const model = {
  transcripResults: "",

  setResults(results) {
    this.transcripResults = results;
  },
};
