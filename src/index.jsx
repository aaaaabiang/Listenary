import { observable } from "mobx";
import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { ReactRoot } from "./ReactRoot";
import { model } from "./model";
import "./styles/LoginPage.css";

console.log("Login page styles loaded");

const myModel = observable(model);
window.myModel = myModel;

createRoot(document.getElementById("root")).render(
  <ReactRoot model={myModel} />
); //*render the ReactRoot component to the front-end page, pass the model to it*
