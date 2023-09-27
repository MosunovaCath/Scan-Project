import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import searchSlice from "./slices/searchSlice";
import searchNews from "./slices/searchNewsSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  searchResults: searchSlice,
  searchNews: searchNews,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
