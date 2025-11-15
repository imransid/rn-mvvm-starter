import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Child, initialState } from "./homeTypes";

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    // -----------------------------
    // CREATE CHILD
    // -----------------------------
    createChildRequest(state, _action: PayloadAction<Child>) {
      state.loading = true;
      state.error = null;
    },
    createChildSuccess(state, action: PayloadAction<Child[]>) {
      state.loading = false;
    },
    createChildFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
 

    // -----------------------------
    // SELECT CHILD LOCALLY
    // -----------------------------
    selectChild(state, action: PayloadAction<Child>) {
      state.selectedChild = action.payload;
    },

    // -----------------------------
    // FORCE LOADERS (optional)
    // -----------------------------
    setForceStopLoader(state) {
      state.loading = false;
    },
    setForceStartLoader(state) {
      state.loading = true;
    },
  },
});

export const {
  createChildRequest,
  createChildSuccess,
  createChildFailure,
  selectChild,
  setForceStopLoader,
  setForceStartLoader,
} = homeSlice.actions;

export default homeSlice.reducer;
