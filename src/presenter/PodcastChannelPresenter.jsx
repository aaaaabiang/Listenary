import { observer } from "mobx-react-lite";
import { PodcastChannelView } from "../views/PodcastChannelView";
import { useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const PodcastChannelPresenter = observer(function PodcastChannelPresenter(props) {
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  const model = props.model;
  const channelInfo = props.model.podcastChannelInfo;
  const episodes = props.model.podcastEpisodes;

    // 新增 useEffect：首次挂载或刷新时自动加载数据
    useEffect(() => {
      if (!episodes.length && model.rssUrl) {
        model.loadRssData();
      }
    }, [episodes.length, model.rssUrl]);
  
  
  // const channelInfo = {
  //   title: "Women Amplified",
  //   coverImage: "/podcast-cover.jpg",
  //   description: "Inspiration meets practical advice in this podcast from the nation's largest network of conferences for women in the workplace. For over 20 years, we've delivered insights from extraordinary women, such as Michelle Obama, Maya Angelou, Indra Nooyi, Elizabeth Gilbert, Billie Jean King, and more.",
  // };

  // const episodes = [
  //   {
  //     id: 1,
  //     title: "It's Time To Lead Like A Woman",
  //     coverImage: "/episode-cover-1.jpg",
  //     description: "In this episode, speaker and executive coach Susanne Goldstein shares her philosophy on leading authentically. Too often, women in positions of power try to lead like men, but Susanne argues that embracing feminine leadership qualities can be more effective.",
  //     duration: "29 min 22 sec",
  //     date: "Mar 26, 2024",
  //     isPlaying: false
  //   },
  //   {
  //     id: 2,
  //     title: "Sheryl Lee Ralph Won't Give Up (And Neither Should You)",
  //     coverImage: "/episode-cover-2.jpg",
  //     description: "In this episode, Sheryl Lee Ralph joins us to share her inspiring journey to \"making it\" in her 60s. In a wide-ranging interview, we talk about coping with rejection, staying true to yourself, and why it's never too late to achieve your dreams.",
  //     duration: "27 min 20 sec",
  //     date: "Feb 22, 2024",
  //     isPlaying: false
  //   }
  // ];

  const handleSave = () => {
    setIsSaved(!isSaved);
    // Add actual save logic here
  };

  const handlePlay = (episodeId) => {
    const episode = episodes.find(e => e.id === episodeId);
    console.log("onPlay clicked, episode:", episode); 
  
    if (!episode) return;
    navigate("/podcast-play", {
      state: { episode: JSON.parse(JSON.stringify(episode)) }//⚠这里可能有问题，显示DataCloneError，只能序列化解决
    });
  };
  
  // 如果没有数据，展示 loading 或 placeholder
  if (!channelInfo || episodes.length === 0) {
    return <div style={{ padding: "2rem" }}>Loading podcast...</div>;
  }

  return (
    <PodcastChannelView 
      channelInfo={channelInfo}
      episodes={episodes}
      isSaved={isSaved}
      onSave={handleSave}
      onPlay={handlePlay}
    />
  );
});

export default PodcastChannelPresenter; 