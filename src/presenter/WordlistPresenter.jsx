import { observer } from "mobx-react-lite";
import { WordlistView } from "../views/WordlistView";
import { useState } from "react";

export const WordlistPresenter = observer(function WordlistPresenter(props) {
  // Mock data - should be fetched from model in actual implementation
  const [selectedWordlist, setSelectedWordlist] = useState("My Wordlist");
  
  const wordlists = [
    { id: 1, name: "My Wordlist", count: 607 },
    { id: 2, name: "History", count: 1144 },
    { id: 3, name: "Wordlist C", count: 586 },
  ];

  const words = [
    {
      word: "accept",
      phonetics: {
        en: "/ək'sept/",
        us: "/ək'sept/"
      },
      definition: "v. to take or receive something that is offered; to agree to something; to believe or recognize something as true"
    },
    {
      word: "academic",
      phonetics: {
        en: "/ækə'demɪk/",
        us: "/ækə'demɪk/"
      },
      definition: "adj. relating to education, schools, universities, or studying; n. a teacher or scholar in a college or university"
    },
    {
      word: "abuse",
      phonetics: {
        en: "/ə'bju:s, ə'bju:z/",
        us: "/ə'bju:s, ə'bju:z/"
      },
      definition: "n. cruel or violent treatment; wrong or improper use; v. to treat someone cruelly or violently; to use something wrongly"
    }
  ];

  return (
    <WordlistView 
      wordlists={wordlists}
      selectedWordlist={selectedWordlist}
      onWordlistSelect={setSelectedWordlist}
      words={words}
    />
  );
}); 