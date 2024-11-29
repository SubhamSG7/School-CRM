import { createSlice } from "@reduxjs/toolkit";

const ProfileSlice = createSlice({
  name: "ProfileSlice",
  initialState: {
    profileData: {},
    loading: true,
  },
  reducers: {
    setProfileData: (state, action) => {
      state.profileData = action.payload;
      state.loading = false;
    },
  },
});

export const { setProfileData } = ProfileSlice.actions;
export default ProfileSlice.reducer;
