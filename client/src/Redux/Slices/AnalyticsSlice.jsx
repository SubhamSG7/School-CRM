import { createSlice } from "@reduxjs/toolkit";

const AnalyticsSlice = createSlice({
  name: "analyticsslice",
  initialState: {
    classAnalytics: [],
    loading: true,
    className: 1,
    page: 1,
    type: "monthly",
    incomeAnalytics: {},
  },
  reducers: {
    setClassAnalytics: (state, action) => {
      state.classAnalytics = action.payload;
      state.loading = false;
    },
    setPage: (state, action) => {
      state.page = state.page + action.payload;
    },
    setClass: (state, action) => {
      state.className = action.payload;
    },
    setIncomeAnalytics: (state, action) => {
      state.incomeAnalytics = action.payload;
    },
  },
});

export const { setClassAnalytics, setPage, setClass, setIncomeAnalytics } =
  AnalyticsSlice.actions;
export default AnalyticsSlice.reducer;
