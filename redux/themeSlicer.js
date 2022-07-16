import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: Cookies.get("theme") ? Cookies.get("theme") : "light",
  },
  reducers: {
    setDark: (state) => {
      Cookies.set("theme", "dark");
      state.theme = "dark";
    },

    setLight: (state) => {
      Cookies.set("theme", "light");
      state.theme = "light";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setDark, setLight } = themeSlice.actions;

export default themeSlice.reducer;
