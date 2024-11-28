import React, { useEffect, useState } from "react";
import ClassWrapper from "./ClassWrapper";
import { getAllotedClass } from "../Redux/Apis/getAllotedClass";
import { useDispatch, useSelector } from "react-redux";
import { setAllotedClass } from "../Redux/Slices/ClassDataSlice";

function ClassRoom() {
  const getRole = localStorage.getItem("role");
  const dispatch = useDispatch();
  const { allotedClasses } = useSelector((state) => state.classDataSlice);
  const [selectedClassName, setSelectedClassName] = useState(null);

  useEffect(() => {
    if (getRole === "Teacher") {
      async function getData() {
        try {
          const getAllotedClasses = await getAllotedClass();
          if (getAllotedClasses) dispatch(setAllotedClass(getAllotedClasses));
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    }
  }, [getRole]);

  const handleViewClassDetails = (className) => {
    setSelectedClassName(className);
  };

  if (selectedClassName) {
    return <ClassWrapper className={selectedClassName} />;
  }

  if (getRole === "Student") return <ClassWrapper data={"hello"} />;

  if (getRole === "Teacher")
    return (
      <div className="p-8 space-y-6">
        <h1 className="text-3xl font-semibold text-gray-800">
          Alloted Classes
        </h1>
        {allotedClasses?.length > 0 ? (
          allotedClasses.map((val) => (
            <div
              key={val?._id}
              className="bg-white shadow-md rounded-lg p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <p className="text-xl font-medium text-gray-900">
                  Class {val?.name}
                </p>
                <span className="text-sm text-gray-500">
                  {val?.studentCount} Students
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200"
                  onClick={() => handleViewClassDetails(val.name)}
                >
                  View Class Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No classes available</p>
        )}
      </div>
    );

  return <div className="text-center text-gray-700">Welcome</div>;
}

export default ClassRoom;
