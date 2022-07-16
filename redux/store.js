import { configureStore } from "@reduxjs/toolkit";
import theme from "./themeSlicer";
import bookmark from "./bookmarkSlicer";
import history from "./HistorySlicer";

export const store = configureStore({
  reducer: {
    theme,
    bookmark,
    history,
  },
});
