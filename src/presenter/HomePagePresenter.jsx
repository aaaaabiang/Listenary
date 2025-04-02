import { HomePageView } from "../views/HomePageView";
import { observer } from "mobx-react-lite";

export const HomePagePresenter = observer(function HomePagePresenter(props) {
  return <HomePageView model={props.model} />;
});

