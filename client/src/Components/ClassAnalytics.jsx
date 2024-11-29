import React, { useEffect } from "react";
import { getClassAnalytics } from "../Redux/Apis/getClassAnalytics";
import { useDispatch, useSelector } from "react-redux";
import {
  setClass,
  setClassAnalytics,
  setPage,
} from "../Redux/Slices/AnalyticsSlice";
import { DotLoader } from "react-spinners";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

function ClassAnalytics() {
  const { className, page, loading, classAnalytics } = useSelector(
    (state) => state.analyticsSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const resp = await getClassAnalytics({ className, page });
      if (resp) {
        dispatch(setClassAnalytics(resp.data));
      }
    }
    fetch();
  }, [className, page, dispatch]);

  const handlePageChange = (value) => {
    dispatch(setPage(value));
  };

  const handleClassChange = (e) => {
    dispatch(setClass(e.target.value));
  };

  if (loading)
    return (
      <div className="h-[70vh] flex justify-center items-center">
        <DotLoader />
      </div>
    );

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-end mb-4">
        {" "}
        {/* Reduced mb-6 to mb-4 */}
        <select
          value={className}
          onChange={handleClassChange}
          className="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg shadow-md"
        >
          {Array.from({ length: 8 }, (_, i) => i + 1).map((val) => (
            <option key={val} value={val}>
              Standard {val}
            </option>
          ))}
        </select>
      </div>

      <h3 className="text-3xl font-bold text-center text-gray-800 mb-4">
        {" "}
        {/* Reduced mb-6 to mb-4 */}
        STANDARD {className}
      </h3>

      <div className="mb-6 bg-gray-500 text-black py-4 px-6 rounded-lg shadow-lg">
        <h4 className="text-2xl font-semibold">
          Class Fee:{" "}
          <span className="font-bold text-xl">₹{classAnalytics?.classFee}</span>
        </h4>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-8">
        {/* Teacher Details Table */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <caption className="font-bold text-xl text-gray-700 py-4 px-6 bg-gray-200">
              Teacher Details
            </caption>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Name
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Email
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Gender
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Mobile
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Specialised Subject
                </th>
              </tr>
            </thead>
            <tbody>
              {classAnalytics?.teacherDetails?.length > 0 ? (
                classAnalytics.teacherDetails.map((val) => {
                  const { _id, name, email, gender, mobile, subject } = val;
                  return (
                    <tr key={_id} className="hover:bg-gray-50 transition-all">
                      <td className="border p-3 text-sm">
                        {name.toUpperCase()}
                      </td>
                      <td className="border p-3 text-sm">{email}</td>
                      <td className="border p-3 text-sm">{gender}</td>
                      <td className="border p-3 text-sm">{mobile}</td>
                      <td className="border p-3 text-sm">{subject}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No teacher details available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Student Details Table */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg overflow-hidden">
          <table className="min-w-full border-collapse">
            <caption className="font-bold text-xl text-gray-700 py-4 px-6 bg-gray-200">
              Student Details
            </caption>
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Name
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Email
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Gender
                </th>
                <th className="border p-3 text-left text-sm font-semibold text-gray-100">
                  Mobile
                </th>
              </tr>
            </thead>
            <tbody>
              {classAnalytics?.studentDetails?.length > 0 ? (
                classAnalytics.studentDetails.map((val) => {
                  const { _id, name, email, gender, mobile } = val;
                  return (
                    <tr key={_id} className="hover:bg-gray-50 transition-all">
                      <td className="border p-3 text-sm">
                        {name.toUpperCase()}
                      </td>
                      <td className="border p-3 text-sm">{email}</td>
                      <td className="border p-3 text-sm">{gender}</td>
                      <td className="border p-3 text-sm">{mobile}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-4 text-sm text-gray-500"
                  >
                    No students found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Section */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={() => handlePageChange(-1)}
          className="px-6 py-2 text-sm font-semibold text-gray-800 border-2 border-gray-300 hover:border-gray-700 hover:text-gray-700 transition-all flex items-center gap-2 rounded-lg"
          disabled={page === 1}
        >
          <FiChevronLeft size={20} />
          Prev
        </button>
        <button
          onClick={() => handlePageChange(1)}
          className="px-6 py-2 text-sm font-semibold text-gray-800 border-2 border-gray-300 hover:border-gray-700 hover:text-gray-700 transition-all flex items-center gap-2 rounded-lg"
          disabled={page >= 8}
        >
          Next
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}

export default ClassAnalytics;
