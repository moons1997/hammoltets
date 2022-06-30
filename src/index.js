import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import { store } from "./redux/storeConfig/store";
import { Provider } from "react-redux";
import { Spin } from "antd";
import axios from "axios";
// import Context from "./services/Context";
import "antd/dist/antd.css";

axios.defaults.baseURL = "http://localhost:3001";

const App = lazy(() => import("./App"));

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<Spin />}>
      <App />
    </Suspense>
  </Provider>,

  document.getElementById("root")
);
