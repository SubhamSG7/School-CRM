import React, { useEffect } from "react";
import { getPaymentDetails } from "../Redux/Apis/getPaymentDetails";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPayment } from "../Redux/Slices/paymentSlice";
import { PuffLoader } from "react-spinners";

function StudentFee() {
  const { totalPayment, loading } = useSelector((state) => state.paymentSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const resp = await getPaymentDetails();
      dispatch(setTotalPayment(resp?.fee)); // Assuming the response contains only the total fee
    }
    fetch();
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex h-[70vh] justify-center items-center">
        <PuffLoader />
      </div>
    );
  }

  // If totalPayment (fee) is available, break it down into components
  const tuitionFee = totalPayment * 0.6;
  const hostelFee = totalPayment * 0.2;
  const examFee = totalPayment * 0.1;
  const otherFees = totalPayment * 0.1;
  const totalFeeBreakdown = tuitionFee + hostelFee + examFee + otherFees;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Student Fee Breakdown
      </h2>

      {totalPayment ? (
        <div className="overflow-x-auto bg-white rounded-lg shadow-lg">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Description
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Amount (INR)
                </th>
                <th className="px-6 py-3 text-sm font-medium text-gray-700">
                  Percentage (%)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Tuition Fee</td>
                <td className="px-6 py-3">{tuitionFee.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.6 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Hostel Fee</td>
                <td className="px-6 py-3">{hostelFee.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.2 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Exam Fee</td>
                <td className="px-6 py-3">{examFee.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.1 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Other Fees</td>
                <td className="px-6 py-3">{otherFees.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.1 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">Total Fee</td>
                <td className="px-6 py-3 font-semibold">
                  {totalPayment.toFixed(2)}
                </td>
                <td className="px-6 py-3 font-semibold">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">No fee details available</p>
      )}
    </div>
  );
}

export default StudentFee;
