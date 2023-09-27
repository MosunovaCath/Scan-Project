import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "searchResults",
  initialState: { data: [], isLoading: false, error: false },
  reducers: {
    setSearchResult: (state, action) => {
      state.data.length = 0;
      action.payload.data.forEach((elem) => state.data.push(elem));
      state.isLoading = false;
      state.error = false;
    },
    setHistogramsIsLoading: (state, action) => {
      state.error = false;
      state.isLoading = action.payload;
    },
    setHistogramsError: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});
export const { setSearchResult, setHistogramsIsLoading, setHistogramsError } =
  searchSlice.actions;
export default searchSlice.reducer;
