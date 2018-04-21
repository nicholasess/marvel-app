import { combineReducers } from "redux";
import characters from "./characters";
import { routerReducer } from "react-router-redux";

export default combineReducers({
  characters,
  routing: routerReducer
});
