import { configureStore } from "@reduxjs/toolkit";
import signupslice from "./Slices/SignupSlice";

export const store = configureStore({
  reducer: { signupslice },
});
