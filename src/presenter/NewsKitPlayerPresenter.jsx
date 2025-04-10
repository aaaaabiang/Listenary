import {
    AudioPlayerComposable,
    AudioPlayerVolumeControl,
    AudioPlayerPlayPauseButton,
    AudioPlayerTimeDisplay,
    AudioPlayerSeekBar,
    AudioPlayerPlaybackSpeedControl,
    GridLayout,
    useBreakpointKey,
  } from 'newskit';
  
  const AudioPlayerPresenter = ({ audioSrc }) => {
    const breakpointKey = useBreakpointKey();
  
    return (
      <AudioPlayerComposable src={audioSrc}>
        <GridLayout
          columns="auto auto 84px 1fr auto auto"
          columnGap="space040"
          alignItems="center"
        >
          <AudioPlayerVolumeControl layout={breakpointKey === 'xs' ? 'collapsed' : 'horizontal'} />
          <AudioPlayerPlayPauseButton size="small" />
          <AudioPlayerTimeDisplay />
          <AudioPlayerSeekBar />
          <AudioPlayerPlaybackSpeedControl useModal={{ xs: true, md: true }} />
        </GridLayout>
      </AudioPlayerComposable>
    );
  };
  
  export default AudioPlayerPresenter;
  