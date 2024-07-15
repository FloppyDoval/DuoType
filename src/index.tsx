import "normalize.css";
import "web-ui/styles/fonts.scss";

import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import App from "components/App";
import "images/favicon.ico";
import "styles/index.module.scss";

const AppWithRouter = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<App />} path="*" />
    </Routes>
  </BrowserRouter>
);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<AppWithRouter />);
