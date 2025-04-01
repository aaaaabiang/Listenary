import { observer } from "mobx-react-lite";
import { TranscripResultsView } from "../views/TranscriptionView.jsx";
import { SuspenseView } from "../views/suspenseView.jsx";

const Transcription = observer(function TranscripRender(props) {
  // const { data, promise, error } = props.model.transcripResultsPromiseState;
  return (
    //use a boolean expression {data && A || B}, where data is from the promise state, A=the search results and B= the suspense
    //if data == true return A, if data ==null/undefine return B.
    <div>
      {/* {(data &&  */}
      <TranscripResultsView
        transcripResults={props.model.transcripResults}
      />{" "}
      {/* || (
        <SuspenseView promise={promise} error={error} /> */}
    </div>
  );
});

export { Transcription };
