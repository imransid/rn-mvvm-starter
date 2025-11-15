import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConnectedDevice, initialState, User } from "./authTypes";



const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // -----------------------------
    // LOGIN FLOW
    // -----------------------------
    loginRequest(state, _action: PayloadAction<{ email: string; password: string }>) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; access_token: string }>
    ) {
      state.loading = false;
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.isAuthenticated = true;
      state.error = null;
    },
    loginFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
      state.isAuthenticated = false;
    },

    // -----------------------------
    // REGISTER FLOW
    // -----------------------------
    registerRequest(state, _action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    registerFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // -----------------------------
    // FORGOT PASSWORD FLOW
    // -----------------------------
    forgotPasswordRequest(state, _action: PayloadAction<any>) {
      state.loading = true;
      state.error = null;
    },
    forgotPasswordSuccess(state) {
      state.loading = false;
      state.error = null;
    },
    forgotPasswordFailure(state, action: PayloadAction<{ error: string }>) {
      state.loading = false;
      state.error = action.payload.error;
    },

    // -----------------------------
    // CONNECTED DEVICES
    // -----------------------------
    fetchConnectedDevicesRequest(state) {
      state.connectedDevicesStatus = "loading";
      state.connectedDevicesError = null;
    },
    fetchConnectedDevicesSuccess(
      state,
      action: PayloadAction<ConnectedDevice[]>
    ) {
      state.connectedDevicesStatus = "succeeded";
      state.connectedDevices = action.payload;
    },
    fetchConnectedDevicesFailure(state, action: PayloadAction<string>) {
      state.connectedDevicesStatus = "failed";
      state.connectedDevicesError = action.payload;
    },

    // -----------------------------
    // REFRESH TOKEN / SESSION
    // -----------------------------
    setRefreshTime(state) {
      state.lastRefreshTime = Date.now();
    },
    restoreSession(
      state,
      action: PayloadAction<{ user: User | null; access_token: string | null }>
    ) {
      state.user = action.payload.user;
      state.access_token = action.payload.access_token;
      state.isAuthenticated = !!action.payload.user;
    },


    // force loader 
    setForceStopLoader(state) {
      state.loading = false;
    },
    setForceStartLoader(state) {
      state.loading = true;
    },


    // set tutorial status
    setTutorialStatus(state){
      state.tutorialStatus = false
    },

    // -----------------------------
    // LOGOUT
    // -----------------------------
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.access_token = null;
      state.loading = false;
      state.error = null;
      state.connectedDevices = [];
      state.tutorialStatus = true
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  fetchConnectedDevicesRequest,
  fetchConnectedDevicesSuccess,
  fetchConnectedDevicesFailure,
  setRefreshTime,
  restoreSession,
  logout,
  setForceStopLoader,
  setForceStartLoader,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  setTutorialStatus
} = authSlice.actions;

export default authSlice.reducer;
