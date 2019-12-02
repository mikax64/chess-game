import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { squareReducer } from "./reducers/squareReducer";
import { pieceReducer } from "./reducers/pieceReducer";

const rootReducer = combineReducers({
  squares: squareReducer,
  pieces: pieceReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
