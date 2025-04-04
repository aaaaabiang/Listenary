import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { HomePagePresenter } from "./presenter/HomePagePresenter";
import TranslationAPI from "./test/TranslationAPI";

export const ReactRoot = observer(function ReactRoot(props) {
  return (
    <RouterProvider router={makeRouter(props.model)} />
    /*RouterProvider comes from react-router-dom*/
  )
});

export function makeRouter(ReactiveModel) {
  return createHashRouter([
    {
      path: "/",
      element: <HomePagePresenter model={ReactiveModel} />,
    },
    {
      path: "/translation-test",
      element: <TranslationAPI />,
    },
  ]);
}
