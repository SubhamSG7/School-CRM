import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { validation } from "../../Handlers/validation";
import axios from "axios";
export const sendSignupData = createAsyncThunk(
  "signup/sendSignupData",
  async (signupData, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_BackendURL;
      console.log(url);
      const response = await axios.post(`${url}/api/signup`, signupData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const SignupSlice = createSlice({
  name: "signupslice",
  initialState: {
    role: null,
    userInfo: {},
    error: {},
    classes: [1, 2, 3, 4, 5, 6, 7, 8],
    subjects: ["English", "Hindi", "Maths", "Science", "EVS"],
    backendResponse: "",
  },
  reducers: {
    addInfo: (state, action) => {
      const incomingName = action.payload.name;
      const incomingValue = action.payload.value;
      state.userInfo[incomingName] = incomingValue;
    },
    clearInfo: (state, action) => (state.userInfo = {}),
    setRole: (state, action) => {
      state.userInfo = {};
      state.error = {};
      state.role = action.payload;
    },
    clearRole: (state, action) => {
      state.role = null;
    },
    validate: (state, action) => {
      const incomingName = action.payload;
      let validationResult = validation(
        incomingName,
        state.userInfo[incomingName]
      );
      if (validationResult) {
        state.error[incomingName] = validationResult;
      } else {
        delete state.error[incomingName];
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendSignupData.pending, (state) => {
        state.backendResponse = "loading";
      })
      .addCase(sendSignupData.fulfilled, (state, action) => {
        state.backendResponse = "success";
      })
      .addCase(sendSignupData.rejected, (state, action) => {
        state.backendResponse = action.payload;
      });
  },
});
export const { addInfo, clearInfo, clearRole, setRole, validate } =
  SignupSlice.actions;
export default SignupSlice.reducer;
