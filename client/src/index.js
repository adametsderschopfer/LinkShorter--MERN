import React from "react";
import { render } from "react-dom";

import "./index.sass";
import { App } from "./App";
import { BrowserRouter } from "react-router-dom";

const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

render(app, document.getElementById("root"));
