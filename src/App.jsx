import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Nav from "./Component/Nav/Nav";
import RouterConfig from "./Component/RouterConfig/RouterConfig";
import { Provider } from "react-redux";
import store from "./store/store";
import ScrollToTop from "./Component/ScrollToTop/ScrollToTop";
import SearchResult from "./Component/SearchResult/SearchResult";

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Nav></Nav>
        <SearchResult />
        <RouterConfig />
        <ScrollToTop />
      </BrowserRouter>
    </Provider>
  );
}
