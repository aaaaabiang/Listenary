// models/audioPlayerStore.js
import { makeAutoObservable } from "mobx";

class AudioPlayerStore {
  isPlaying = false;
  currentTime = 0;

  constructor() {
    makeAutoObservable(this);
  }

  play() {
    this.isPlaying = true;
  }

  pause() {
    this.isPlaying = false;
  }

  setCurrentTime(time) {
    this.currentTime = time;
  }
}

const audioPlayerStore = new AudioPlayerStore();
export default audioPlayerStore;
