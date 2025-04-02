// import { NewsKitProvider, AudioPlayer, newskitLightTheme } from "newskit";
// import NewsKitPlayerView from "../views/NewsKitPlayerView";
// const NewsKitPlayerPage = () => {
//   const audioUrl =
//     "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
//   return (
//     <NewsKitProvider
//       theme={newskitLightTheme}
//       instrumentation={"instrumentation provider props"}
//       layer={"layer organizer props"}
//     >
//       <AudioPlayer src={audioUrl}>
//         <NewsKitPlayerView />//是这里多了删掉，孙姐审阅完了可以删掉
//       </AudioPlayer>
//     </NewsKitProvider>
//   );
// };
// export default NewsKitPlayerPage;


import { 
  GridLayout,
  useBreakpointKey,
  AudioPlayerComposable,
  AudioPlayerVolumeControl,
  AudioPlayerPlayPauseButton,
  AudioPlayerSkipNextButton,
  AudioPlayerSkipPreviousButton,
  AudioPlayerTimeDisplay,
  AudioPlayerSeekBar,
  AudioPlayerPlaybackSpeedControl,
} from "newskit";
import NewsKitPlayerView from "../views/NewsKitPlayerView";

const NewsKitPlayerPage = () => {
  const breakpointKey = useBreakpointKey();
  return (
    <AudioPlayerComposable src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3">
      <GridLayout
        columns="auto auto 50px 50px 50px 1fr auto auto"
        columnGap="space040"
        alignItems="center"
      >
        <AudioPlayerVolumeControl
          layout={breakpointKey === 'xs' ? 'collapsed' : 'horizontal'}
        />
        <AudioPlayerTimeDisplay />
        <AudioPlayerSkipNextButton size="small" />
        <AudioPlayerPlayPauseButton size="small" />
        <AudioPlayerSkipPreviousButton size="small" />
        <AudioPlayerSeekBar />
        <AudioPlayerPlaybackSpeedControl useModal={{xs: true, md: true}} />
      </GridLayout>
    </AudioPlayerComposable>
  );
};


export default NewsKitPlayerPage;


