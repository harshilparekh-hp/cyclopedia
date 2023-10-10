import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Header from "./layout/Header";
import CycleOPediaClassPage from "./cycleopediaclasspage";
import CycleOPediaClassPageFunc from "./cycleopediaclasspagefunc";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <Header></Header>
    <div className="row text-black">
      <div className="col-6">
        <span className="h1 text-warning text-center">Class Component</span>
        <CycleOPediaClassPage />
      </div>

      <div className="col-6">
        <span className="h1 text-warning text-center">Functional Components</span>
        <CycleOPediaClassPageFunc />
      </div>
    </div>
  </div>
);
