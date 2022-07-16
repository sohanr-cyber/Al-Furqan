import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const historySlice = createSlice({
  name: "history",
  initialState: {
    history: Cookies.get("history") ? JSON.parse(Cookies.get("history")) : [],
  },
  reducers: {
    addtoHistory: (state, action) => {
      let withNewOne = [action.payload, ...state.history];
      Cookies.set("history", JSON.stringify(withNewOne));
      state.history = withNewOne;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addtoHistory } = historySlice.actions;

export default historySlice.reducer;
