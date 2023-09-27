import { createSlice } from "@reduxjs/toolkit";

const searchNews = createSlice({
  name: "searchNews",
  initialState: { data: [], isLoading: false, error: false },
  reducers: {
    setSearchNews: (state, action) => {
      state.data.length = 0;
      action.payload.forEach((elem) => state.data.push(elem));
      state.isLoading = false;
      state.error = false;
    },
    setNewsIsLoading: (state) => {
      state.error = false;
      state.isLoading = true;
    },
    setNewsError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});
export const { setSearchNews, setNewsIsLoading, setNewsError } =
  searchNews.actions;
export default searchNews.reducer;
