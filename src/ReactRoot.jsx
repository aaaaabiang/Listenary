import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { HomePagePresenter } from "./presenter/HomePagePresenter";
import { Transcription } from "./presenter/TranscrptionPresenter";
import { WordlistPresenter } from "./presenter/WordlistPresenter";
import PodcastChannelPresenter from "./presenter/PodcastChannelPresenter";
import PodcastPlayPresenter from "./presenter/PodcastPlayPresenter";
import TranslationAPI from "./test/TranslationAPI";
import LoginPresenter from "./presenter/loginPagePresenter.jsx";
import { RssPresenter } from "./presenter/rssPresenter";

const ReactRoot = observer(function ReactRoot(props) {
  return (
    <RouterProvider router={makeRouter(props.model)} />
    /*RouterProvider comes from react-router-dom*/
  );
});

export { ReactRoot };

export function makeRouter(ReactiveModel) {
  return createHashRouter([
    {
      path: "/",
      element: <HomePagePresenter model={ReactiveModel} />,
    },
    {
      path: "/wordlist",
      element: <WordlistPresenter model={ReactiveModel} />,
    },
    {
      path: "/Transcription",
      element: <Transcription model={ReactiveModel} />,
    },
    {
      path: "/login",
      element: <LoginPresenter model={ReactiveModel} />,
    },
    {
      path: "/podcast-channel",
      element: <PodcastChannelPresenter model={ReactiveModel} />,
    },
    {
      path: "/podcast-play",
      element: <PodcastPlayPresenter model={ReactiveModel} />,
    },
    {
      path: "/rss-test",
      element: <RssPresenter />,
    }
  ]);
}
