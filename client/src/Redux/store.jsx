import { configureStore } from "@reduxjs/toolkit";
import signupslice from "./Slices/SignupSlice";
import classSlice from "./Slices/classSlice";
import loginSlice from "./Slices/LoginSlice";
import classDataSlice from "./Slices/ClassDataSlice";
import analyticsSlice from "./Slices/AnalyticsSlice";
import profileSlice from "./Slices/ProfileSlice";
import paymentSlice from "./Slices/paymentSlice";
export const store = configureStore({
  reducer: {
    signupslice,
    classSlice,
    loginSlice,
    classDataSlice,
    analyticsSlice,
    profileSlice,
    paymentSlice,
  },
});
