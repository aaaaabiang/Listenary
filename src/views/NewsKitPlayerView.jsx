import { NewsKitProvider, AudioPlayer, newskitLightTheme } from "newskit";
const NewsKitPlayerView = () => {
  return (
    <NewsKitProvider theme={newskitLightTheme}>
      {" "}
      <div>
        {" "}
        <h2>NewsKit Audio Player</h2>{" "}
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          autoPlay={false}
          showPlaybackSpeedControl
        />{" "}
      </div>{" "}
    </NewsKitProvider>
  );
};
export default NewsKitPlayerView;
