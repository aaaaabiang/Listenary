import { observer } from "mobx-react-lite";
import { PodcastPlayView } from "../views/PodcastPlayView";
import AudioPlayerPresenter from "./NewsKitPlayerPresenter";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { speechToText } from "..////speechToText"; // API HERE
const PodcastPlayPresenter = observer(function PodcastPlayPresenter(props) {

  const location = useLocation();
  const navigate = useNavigate();
  const episode = location.state?.episode;

  const [transcriptionData, setTranscriptionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!episode) return;
    setIsLoading(true);
    speechToText({ url: episode.audioUrl })
      .then((result) => {
        setTranscriptionData(result);
      })
      .catch((err) => {
        console.error("Transcription error:", err);
      })
      .finally(() => setIsLoading(false));
  }, [episode]);

  if (!episode) {
    return (
      <div style={{ padding: "2rem" }}>
        <p>No episode data</p>
        <button onClick={() => navigate("/podcast-channel")}>← Back</button>
      </div>
    );
  }

  const podcastData = {
    title: episode.title,
    description: episode.description,
    audioUrl: episode.audioUrl,
    duration: episode.duration,
    source: props.model?.podcastChannelInfo?.title || "Podcast",
    coverImage: Array.isArray(episode.coverImage) ? episode.coverImage[0] : episode.coverImage
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
      isLoading={isLoading}
    />
  );
});

export default PodcastPlayPresenter;
