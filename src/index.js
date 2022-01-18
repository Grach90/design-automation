import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Mycontext } from "./Context/context.js";

function Main() {
  const [urn, setUrn] = useState("");
  const [loading, setLoading] = useState(false);
  return (
    <Mycontext.Provider value={{ urn, setUrn, loading, setLoading }}>
      <App loading={loading} />
    </Mycontext.Provider>
  );
}
ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
