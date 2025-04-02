import { observable } from "mobx";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot";
import { model } from "./Model";

const myModel = observable(model);
window.myModel = myModel;

createRoot(document.getElementById("root")).render(
  <ReactRoot model={myModel} />
); //*render the ReactRoot component to the front-end page, pass the model to it*
