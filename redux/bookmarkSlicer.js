import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState: {
    bookmarks: Cookies.get("bookmarks")
      ? JSON.parse(Cookies.get("bookmarks"))
      : [],
    bookmarkedSurah: Cookies.get("bookmarkedSurah")
      ? JSON.parse(Cookies.get("bookmarkedSurah"))
      : [],
  },
  reducers: {
    addToBookmark: (state, action) => {
      let withNewOne = [action.payload, ...state.bookmarks];
      Cookies.set("bookmarks", JSON.stringify(withNewOne));
      state.bookmarks = withNewOne;
    },

    removeFromBookmark: (state, action) => {
      let withNewOne = state.bookmarks.filter(
        (item) => item.id != action.payload.id
      );
      Cookies.set("bookmarks", JSON.stringify(withNewOne));
      state.bookmarks = withNewOne;
    },

    addToBookmarkedSurah: (state, action) => {
      let withNewOne = [action.payload, ...state.bookmarkedSurah];
      Cookies.set("bookmarkedSurah", JSON.stringify(withNewOne));
      state.bookmarkedSurah = withNewOne;
    },

    removeFromBookmarkedSurah: (state, action) => {
      let withNewOne = state.bookmarkedSurah.filter(
        (item) => item.id != action.payload.id
      );
      Cookies.set("bookmarkedSurah", JSON.stringify(withNewOne));
      state.bookmarkedSurah = withNewOne;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addToBookmark,
  removeFromBookmark,
  addToBookmarkedSurah,
  removeFromBookmarkedSurah,
} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
