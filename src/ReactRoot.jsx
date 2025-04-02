// import NewsKitPlayerPage from "./presenter/NewsKitPlayerPresenter";
// export const ReactRoot = () => {
//   return (
//     <div style={{ padding: "40px" }}>
//       {" "}
//       <h1>Audio Player MVP Structure Test</h1>{" "}
//       <h2>NewsKit Audio Player Demo</h2> <NewsKitPlayerPage />{" "}
//     </div>
//   );
// };

// 修改后的 ReactRoot.jsx
import { NewsKitProvider, newskitLightTheme } from "newskit";
import DemoPage8 from "./presenter/NewsKitPlayerPresenter";
//import { TimeDisplay } from './time-display';
import { observer } from "mobx-react-lite";
import { Transcription } from "./presenter/TranscriptionPresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";

export const ReactRoot = observer(function ReactRoot(props) {
  return (
    // 全局唯一的 NewsKitProvider挪到root这里来了
    <div>
      <NewsKitProvider theme={newskitLightTheme}>
        {" "}
        <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
          {" "}
          <h1 style={{ marginBottom: "16px" }}>
            {" "}
            Audio Player MVP Structure Test{" "}
          </h1>{" "}
          <h2 style={{ marginBottom: "24px" }}>
            NewsKit Audio Player Demo
          </h2>{" "}
          {/* 确保此处只渲染一个播放器 */} <DemoPage8 />{" "}
        </div>{" "}
      </NewsKitProvider>
      <div>
        {" "}
        <RouterProvider router={makeRouter(props.model)} />{" "}
      </div>{" "}
    </div>
  );
});

export function makeRouter(ReactiveModel) {
  return createHashRouter([
    {
      path: "/",
      element: <DemoPage8 model={ReactiveModel} />,
    },
    {
      path: "/audioplayer",
      element: <DemoPage8 model={ReactiveModel} />,
    },
    {
      path: "/transcription",
      element: <Transcription model={ReactiveModel} />,
    },
  ]);
}
