import { observer } from "mobx-react-lite";
import { PodcastPlayView } from "../views/PodcastPlayView";
import AudioPlayerPresenter from "./NewsKitPlayerPresenter";

const PodcastPlayPresenter = observer(function PodcastPlayPresenter(props) {
  // Mock data - will be replaced with real data
  const podcastData = {
    title: "It's Time To Lead Like A Woman",
    description: "Pretend this is the transcription of the podcast. In this inspiring episode, we explore the unique strengths and perspectives that women bring to leadership roles. Join us as we discuss transformative leadership styles, breaking barriers, and creating inclusive workplaces where everyone can thrive.",
    audioUrl: "https://example.com/podcast.mp3",
    duration: "45:30",
    source: "Women Amplified"
  };

  const wordCard = {
    word: "leadership",
    phonetics: {
      uk: "/ˈliː.də.ʃɪp/",
      us: "/ˈliː.dɚ.ʃɪp/"
    },
    definition: "The quality of being good at leading a group, organization, country, etc.",
    examples: [
      "She showed strong leadership during the crisis.",
      "The company needs better leadership.",
      "Under her leadership, the team achieved remarkable success."
    ],
    relatedTerms: [
      "lead",
      "leader",
      "leading"
    ]
  };

  return (
    <PodcastPlayView 
      podcastData={podcastData}
      wordCard={wordCard}
      AudioPlayer={AudioPlayerPresenter}
    />
  );
});

export default PodcastPlayPresenter; 