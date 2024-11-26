import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendClassDetails = createAsyncThunk(
  "addclass/sendClassDetails",
  async (classDetails, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_BackendURL;
      const response = await axios.post(`${url}/api/addclass`, classDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const classSlice = createSlice({
  name: "classslice",
  initialState: {
    className: "",
    backendResponse: "",
  },
  reducers: {
    setClass: (state, action) => {
      state.className = action.payload;
    },
    clearClass: (state, action) => {
      state.className = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendClassDetails.pending, (state) => {
        state.backendResponse = "loading";
      })
      .addCase(sendClassDetails.fulfilled, (state, action) => {
        state.backendResponse = "success";
      })
      .addCase(sendClassDetails.rejected, (state, action) => {
        state.backendResponse = action.payload;
      });
  },
});
export const { setClass, clearClass } = classSlice.actions;
export default classSlice.reducer;
