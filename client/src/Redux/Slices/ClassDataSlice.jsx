import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getClassData = createAsyncThunk(
  "classData/getClassData",
  async (className, { rejectWithValue }) => {
    try {
      const url = import.meta.env.VITE_BackendURL;
      const response = await axios.post(`${url}/api/classdata`, className, {
        withCredentials: true,
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

const ClassDataSlice = createSlice({
  name: "classdataslice",
  initialState: {
    studentList: [],
    selectedStudentList: [],
    backendResponse: {},
    loading: true,
    page: 1,
    allotedClasses: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setPage: (state, action) => {
      state.page = state.page + parseInt(action.payload);
    },
    setAllotedClass: (state, action) => {
      state.allotedClasses = action.payload;
    },
    sortStudents: (state, action) => {
      const { type, value } = action.payload;
      state.selectedStudentList = state.studentList;

      switch (type) {
        case "name":
          state.selectedStudentList = state.selectedStudentList.filter(
            (student) => {
              const nameWords = student.name.toLowerCase().split(" ");
              return nameWords.some((word) =>
                word.startsWith(value.toLowerCase().trim())
              );
            }
          );
          break;

        case "gender":
          state.selectedStudentList = state.selectedStudentList.filter(
            (student) => student.gender.toLowerCase() === value.toLowerCase()
          );
          break;

        default:
          break;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClassData.pending, (state) => {
        state.loading = true;
      })
      .addCase(getClassData.fulfilled, (state, action) => {
        state.studentList = action.payload?.data;
        state.selectedStudentList = action.payload?.data;
      })
      .addCase(getClassData.rejected, (state, action) => {
        state.studentList = action.payload;
      });
  },
});
export const { setLoading, setPage, setAllotedClass, sortStudents } =
  ClassDataSlice.actions;
export default ClassDataSlice.reducer;
