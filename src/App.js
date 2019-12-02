import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./App.scss";
import ChessBoard from "./components/ChessBoard";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <ChessBoard />
      </div>
    </Provider>
  );
}

export default App;
