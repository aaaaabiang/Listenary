import { observer } from "mobx-react-lite";
import { NewsKitPlayerPage } from "./presenter/NewsKitPlayerPresenter";
import { Transcription } from "./presenter/TranscriptionPresenter";
import { createHashRouter, RouterProvider } from "react-router-dom";
export const ReactRoot = observer(function ReactRoot(props) {
  return (
    <div>
      <RouterProvider router={makeRouter(props.model)} />
    </div>
  );
});

// export function DetailsPresenter(props) {
export function makeRouter(ReactiveModel) {
  return createHashRouter([
    {
      path: "/",
      element: <NewsKitPlayerPage model={ReactiveModel} />,
    },
    {
      path: "/audioplayer",
      element: <NewsKitPlayerPage model={ReactiveModel} />,
    },
    {
      path: "/transcription",
      element: <Transcription model={ReactiveModel} />,
    },
  ]);
}
