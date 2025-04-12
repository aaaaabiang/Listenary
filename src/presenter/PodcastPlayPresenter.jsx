import { observer } from "mobx-react-lite";
import { PodcastPlayView } from "../views/PodcastPlayView";
import AudioPlayerPresenter from "./NewsKitPlayerPresenter";

const PodcastPlayPresenter = observer(function PodcastPlayPresenter(props) {
  // Mock data - will be replaced with real data
  const podcastData = {
    title: "It's Time To Lead Like A Woman",
    description: "In this inspiring episode, we explore the unique strengths and perspectives that women bring to leadership roles.",
    audioUrl: "https://example.com/podcast.mp3",
    duration: "45:30",
    source: "Women Amplified"
  };

  // Mock transcription data - will be replaced with real data from API
  const transcriptionData = [
    {
      timestamp: "00:00:15",
      text: "Welcome to Women Amplified. Today we're discussing leadership from a feminine perspective.",
      translation: "欢迎收听Women Amplified。今天我们将从女性视角探讨领导力。"
    },
    {
      timestamp: "00:00:30",
      text: "Our guest today shares her journey of embracing authentic leadership.",
      translation: "我们今天的嘉宾将分享她拥抱真实领导力的旅程。"
    },
    {
      timestamp: "00:00:45",
      text: "She'll explain why traditional leadership models need to evolve.",
      translation: "她将解释为什么传统的领导力模式需要进化。"
    },
    {
      timestamp: "00:01:00",
      text: "Let's explore how feminine qualities can enhance leadership effectiveness.",
      translation: "让我们一起探讨女性特质如何提升领导效能。"
    }
  ];

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

  const handleWordSelect = (word) => {
    console.log('Selected word:', word);
  };

  return (
    <PodcastPlayView 
      podcastData={podcastData}
      transcriptionData={transcriptionData}
      wordCard={wordCard}
      AudioPlayer={AudioPlayerPresenter}
      onWordSelect={handleWordSelect}
    />
  );
});

export default PodcastPlayPresenter; 