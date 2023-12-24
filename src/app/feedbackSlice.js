import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  severity: "",
  message: "",
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const newLoading = action.payload;
      state.loading = newLoading;
    },
    setFeedback: (state, action) => {
      // action.payload should carry an object
      // with status
      const { severity, message } = action.payload;
      state.severity = severity;
      state.message = message;
    },
  },
});

export const { setLoading, setFeedback } = feedbackSlice.actions;

export default feedbackSlice.reducer;
