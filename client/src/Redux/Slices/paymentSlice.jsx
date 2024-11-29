import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
  name: "paymentSlice",
  initialState: {
    totalPayment: "",
    loading: true,
  },
  reducers: {
    setTotalPayment: (state, action) => {
      state.totalPayment = action.payload;
      state.loading = false;
    },
  },
});
export const { setTotalPayment } = paymentSlice.actions;
export default paymentSlice.reducer;
