import { HomePageView } from "../views/HomePageView";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";


const HomePagePresenter = observer(function HomePagePresenter(props) {
  const navigate = useNavigate();

  function inputHandlerACB(event) {
    props.model.setAudioUrl(event.target.value);
  }

  function submitHandlerACB() {
    props.model.setAudioUrl(props.model.audioUrl); // 如果已有逻辑的话
  }

  function handleNavigateACB() {
    navigate("/Transcription");  
  }

  return (
    <HomePageView
      model={props.model}
      url={props.model.audioUrl}
      onInputChange={inputHandlerACB}
      onSubmit={submitHandlerACB}
      onNavigate={handleNavigateACB} // 新增传入
    />
  );

export { HomePagePresenter };