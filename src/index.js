import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Home from "./pages/Home/Home";
import * as serviceWorker from "./serviceWorker";
import createStore from "./store/createStore";
import "./index.css";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
