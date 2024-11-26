import { configureStore } from "@reduxjs/toolkit";
import signupslice from "./Slices/SignupSlice";
import classSlice from "./Slices/classSlice";

export const store = configureStore({
  reducer: { signupslice, classSlice },
});
