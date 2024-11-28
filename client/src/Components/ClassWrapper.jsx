import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getClassData,
  setPage,
  sortStudents,
} from "../Redux/Slices/ClassDataSlice";

function ClassWrapper(prop) {
  const dispatch = useDispatch();
  const { studentList, page, selectedStudentList } = useSelector(
    (state) => state.classDataSlice
  );

  useEffect(() => {
    dispatch(getClassData({ className: prop.className, page }));
  }, [dispatch, prop.className, page]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Select Gender:
          </label>
          <select
            id="gender"
            name="gender"
            onChange={(e) => {
              dispatch(
                sortStudents({ type: e.target.name, value: e.target.value })
              );
            }}
            className="mt-1 block max-w-screen-sm p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="select" disabled>
              Select
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Search by Name:
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Search by Name"
            onChange={(e) => {
              dispatch(
                sortStudents({ type: e.target.name, value: e.target.value })
              );
            }}
            className="mt-1 block max-w-screen-sm p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {selectedStudentList && selectedStudentList.length > 0 ? (
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-lg bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                Student Name
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                Email
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                Mobile
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                Gender
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left font-semibold text-gray-700">
                Date of Birth
              </th>
            </tr>
          </thead>
          <tbody>
            {selectedStudentList.map((val, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2 border border-gray-300">{val.name}</td>
                <td className="px-4 py-2 border border-gray-300">
                  {val.email}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {val.mobile}
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  {val.gender}
                </td>
                <td className="px-4 py-2 border border-gray-300">{val.dob}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="mt-6 text-center p-4 border-b-4 border-gray-800 rounded-none">
          <p className="text-gray-800 font-semibold text-xl">
            No students to display.
          </p>
          <p className="text-gray-600 text-sm italic">
            Try adjusting the filters or check back later.
          </p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={page === 1}
          onClick={() => dispatch(setPage(-1))}
          className={`px-4 py-2 text-gray-700 border-b-2 rounded-none ${
            page === 1
              ? "border-gray-400 text-gray-400 cursor-not-allowed"
              : "border-blue-500 hover:border-gray-700 hover:text-gray-900 hover:bg-blue-200"
          }`}
        >
          Prev
        </button>

        <span className="text-sm text-gray-700">Page {page}</span>

        <button
          disabled={page >= 8}
          onClick={() => dispatch(setPage(+1))}
          className={`px-4 py-2 text-gray-700 border-b-2 rounded-none ${
            page >= 8
              ? "border-gray-400 text-gray-400 cursor-not-allowed"
              : "border-blue-500 hover:border-gray-700 hover:text-gray-900 hover:bg-blue-200"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ClassWrapper;
