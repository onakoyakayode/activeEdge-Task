import { combineReducers } from "@reduxjs/toolkit";
import artistReducer from "./artistSlice";
import albumReducer from "./albumSlice";
import tweetsReducer from "./tweetsSlice";

const rootReducer = combineReducers({
  artists: artistReducer,
  albums: albumReducer,
  tweets: tweetsReducer,
});

export default rootReducer;
