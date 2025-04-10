import { observable } from "mobx";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot";
import { model } from "./Model";
import { AsrTest } from "../test/asrTest";
import "./styles/LoginPage.css";

const myModel = observable(model);

createRoot(document.getElementById("root")).render(
  <ReactRoot model={myModel} />
  // <AsrTest />  //test ASR api
); //*render the ReactRoot component to the front-end page, pass the model to it*
window.myModel = myModel;
