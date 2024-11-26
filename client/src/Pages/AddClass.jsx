import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendClassDetails, setClass } from "../Redux/Slices/classSlice";
function AddClass() {
  const dispatch = useDispatch();
  const { className } = useSelector((state) => state.classSlice);
  function handleClassSubmit(e) {
    e.preventDefault();
    dispatch(sendClassDetails({ name: className }));
  }
  return (
    <form onSubmit={(e) => handleClassSubmit(e)}>
      <input
        type="text"
        placeholder="Class Name"
        required
        onChange={(e) => {
          dispatch(setClass(e.target.value));
        }}
      />
      <input type="submit" />
    </form>
  );
}

export default AddClass;
