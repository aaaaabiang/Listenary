import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { HomePagePresenter } from "./presenter/HomePagePresenter";
import { Transcription } from "./presenter/TranscrptionPresenter";
import { WordlistPresenter } from "./presenter/WordlistPresenter";
import TranslationAPI from "./test/TranslationAPI";
import LoginPresenter from "./presenter/loginPagePresenter.jsx";

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
      path: "/translation-test",
      element: <TranslationAPI />,
    },
    {
      path: "/Transcription",
      element: <Transcription model={ReactiveModel} />,
    },
    {
      path: "/login",
      element: <LoginPresenter model={ReactiveModel} />,
    }
  ]);
}
