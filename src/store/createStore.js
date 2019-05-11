import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../modules/index";

let store = null;

export function getStore() {
  return store;
}

export default preloadedState => {
  let middlewares = [thunk];

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    rootReducer,
    preloadedState,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../modules/index.js", () => {
      const nextReducer = require("../modules/index.js");
      store.replaceReducer(nextReducer);
    });
  }

  return store;
};
