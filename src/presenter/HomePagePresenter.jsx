import { HomePageView } from "../views/HomePageView";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";


const HomePagePresenter = observer(function HomePagePresenter(props) {
  const navigate = useNavigate();

  function inputHandlerACB(event) {
    props.model.setRssUrl(event.target.value);
  }

  // // 用户输入 RSS 链接
  // function rssInputHandlerACB(event) {
  //   props.model.setRssUrl(event.target.value);
  // }

  // 加载并跳转到 Podcast 页面
  async function submitHandlerACB() {
    await props.model.loadRssData();
    navigate("/podcast-channel");
  }
  
  return (
    <HomePageView
    url={props.model.rssUrl}
    onInputChange={inputHandlerACB}
    onSubmit={submitHandlerACB}
    />
  );
});

export { HomePagePresenter };