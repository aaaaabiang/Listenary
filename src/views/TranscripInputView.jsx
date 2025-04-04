// TranscipInputView.jsx 修改后的子组件
// import { useState, useEffect } from 'react'; // 添加 useEffect
import { NewsKitProvider, newskitLightTheme, TitleBar, Block } from 'newskit';
import AudioPlayerPresenter from '../presenter/NewsKitPlayerPresenter';

export function TranscripInputView(props) {// 接收 props
  // const [audioUrl, setAudioUrl] = useState(url); // 使用 props 初始化

  // // 同步父组件传入的 url 变化
  // useEffect(() => {
  //   setAudioUrl(url);
  // }, [url]);

  // const handleInputChange = (event) => {
  //   const newUrl = event.target.value;
  //   setAudioUrl(newUrl);
  //   onInputChange(event); // 触发父组件回调
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   onSubmit(event); // 触发父组件提交
  // };

  return (
    <NewsKitProvider theme={newskitLightTheme}>
      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <TitleBar>NewsKit Audio Player Demo</TitleBar>
        
      <div>
      <h3>Audio URL</h3>
      <input type="text" value={props.url} onChange={props.onInputChange} />
      <button onClick={props.onSubmit}>Submit</button>
      </div>

        <Block>
          <AudioPlayerPresenter audioSrc={props.url} />
        </Block>
      </div>
    </NewsKitProvider>
  );
}