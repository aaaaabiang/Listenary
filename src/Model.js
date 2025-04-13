import { resolvePromise } from "./resolvePromise.js";
import { speechToText } from "./speechToText.js";

export const model = {
  audioUrl: "",
  audioFile: null, // store audio file
  transcripResults: [],
  transcripResultsPromiseState: "",
  // 新增：RSS 相关状态
  rssUrl: "",
  podcastChannelInfo: null,
  podcastEpisodes: [],
  podcastLoadError: null,

  setResults(results) {
    this.transcripResults = [].concat(results); //MobX 中，直接赋值代理数组会导致更新失败。
  },
  
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

  // 新增
  setRssUrl(url) {
    this.rssUrl = url;
  },
  
  async loadRssData() {
    this.podcastLoadError = null;
    this.podcastChannelInfo = null;
    this.podcastEpisodes = [];

    try {
      const res = await fetch(`http://localhost:3001/api/rss?url=${encodeURIComponent(this.rssUrl)}`);
      const data = await res.json();

      this.podcastChannelInfo = {
        title: data.title,
        description: data.description,
        coverImage: data.image,
      };

      this.podcastEpisodes = data.items.map((item, index) => ({
        id: item.guid || index,
        title: item.title,
        description: item.contentSnippet || item.description,
        coverImage: item.itunes?.image || data.image,
        duration: item.itunes?.duration,
        date: new Date(item.pubDate || item.isoDate).toLocaleDateString(),
        audioUrl: item.enclosure?.url,
      }));
    } catch (err) {
      console.error("RSS fetch failed", err);
      this.podcastLoadError = err.message;
    }
  },
  
  //store asr api result in transcrip result promise state
  getTranscription(params) {
    resolvePromise(speechToText(params), transcripResultsPromiseState);
  },
};

