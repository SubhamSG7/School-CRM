import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validation } from "../../Handlers/validation";
import axios from "axios";

export const sendLoginData = createAsyncThunk(
  "login/sendLoginpData",
  async (loginData, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_BackendURL;
      const response = await axios.post(`${url}/api/login`, loginData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const LoginSlice = createSlice({
  name: "loginslice",
  initialState: {
    logincredential: {},
    validationError: {},
    role: null,
    backendResponse: "",
  },
  reducers: {
    setLogingCredentials: (state, action) => {
      state.logincredential[action.payload.name] = action.payload.value;
    },
    clearLoginCredentials: (state, action) => {
      state.logincredential = {};
    },
    setRole: (state, action) => {
      state.logincredential = {};
      state.validationError = {};
      if (action.payload === "not selected") state.role = null;
      else state.role = action.payload;
    },
    clearRole: (state, action) => {
      state.role = null;
    },
    validate: (state, action) => {
      const incomingName = action.payload;
      let validationResult = validation(
        incomingName,
        state.logincredential[incomingName]
      );
      if (validationResult) {
        state.validationError[incomingName] = validationResult;
      } else {
        delete state.validationError[incomingName];
      }
    },
    clearBackendResponse: (state, action) => {
      (state.logincredential = {}),
        (state.validationError = {}),
        (state.backendResponse = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginData.pending, (state) => {
        state.backendResponse = "loading";
      })
      .addCase(sendLoginData.fulfilled, (state, action) => {
        state.backendResponse = action.payload;
      })
      .addCase(sendLoginData.rejected, (state, action) => {
        state.backendResponse = action.payload;
      });
  },
});
export const {
  setLogingCredentials,
  clearLoginCredentials,
  validate,
  setRole,
  clearBackendResponse,
} = LoginSlice.actions;
export default LoginSlice.reducer;
