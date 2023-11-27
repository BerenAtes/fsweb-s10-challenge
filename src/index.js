import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { reducerNot } from "./reducers";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const middleware = applyMiddleware(thunk, logger);

const reducers = combineReducers({ reducerNot });

const store = createStore(reducers, composeWithDevTools(middleware));

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <>
        <ToastContainer />
        <App />
      </>
    </BrowserRouter>
  </Provider>
);
