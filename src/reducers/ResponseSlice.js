import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openResponse: false,
  errorStatus: false,
  errorValue: "",
};

export const responseSlice = createSlice({
  name: "response",
  initialState,
  reducers: {
    setOpenResponse: (state, action) => {
      state.openResponse = action.payload;
    },
    setErrorStatus: (state, action) => {
      state.errorStatus = action.payload;
    },
    setErrorValue: (state, action) => {
      state.errorValue = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setOpenResponse, setErrorStatus, setErrorValue } = responseSlice.actions;

export default responseSlice.reducer;
