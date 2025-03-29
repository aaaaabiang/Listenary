import { NewsKitProvider, AudioPlayer, newskitLightTheme } from "newskit";
import NewsKitPlayerView from "../views/NewsKitPlayerView";
const NewsKitPlayerPage = () => {
  const audioUrl =
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
  return (
    <NewsKitProvider
      theme={newskitLightTheme}
      instrumentation={"instrumentation provider props"}
      layer={"layer organizer props"}
    >
      <AudioPlayer src={audioUrl}>
        <NewsKitPlayerView />
      </AudioPlayer>
    </NewsKitProvider>
  );
};
export default NewsKitPlayerPage;
