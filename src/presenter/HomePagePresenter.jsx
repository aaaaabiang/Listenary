import { HomePageView } from "../views/HomePageView";
import { observer } from "mobx-react-lite";
import { useRSSInput } from "../hooks/useRSSInput";

export const HomePagePresenter = observer(function HomePagePresenter(props) {
  const handleRSSSubmit = useRSSInput();
  return <HomePageView onRssSubmit={handleRSSSubmit} />;
});

