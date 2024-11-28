import { configureStore } from "@reduxjs/toolkit";
import signupslice from "./Slices/SignupSlice";
import classSlice from "./Slices/classSlice";
import loginSlice from "./Slices/LoginSlice";
import classDataSlice from "./Slices/ClassDataSlice";
export const store = configureStore({
  reducer: { signupslice, classSlice, loginSlice, classDataSlice },
});
