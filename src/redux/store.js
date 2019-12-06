import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { boardReducer } from "./reducers/boardReducer";
import { pieceReducer } from "./reducers/pieceReducer";
import { gameReducer } from "./reducers/gameReducer";

const rootReducer = combineReducers({
  board: boardReducer,
  pieces: pieceReducer,
  game: gameReducer
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
