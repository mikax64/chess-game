import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { squareReducer } from "./reducers/squareReducer";

const rootReducer = combineReducers({
  squares: squareReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
