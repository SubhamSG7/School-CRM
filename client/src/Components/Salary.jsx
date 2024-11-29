import React, { useEffect } from "react";
import { getPaymentDetails } from "../Redux/Apis/getPaymentDetails";
import { useDispatch, useSelector } from "react-redux";
import { setTotalPayment } from "../Redux/Slices/paymentSlice";
import { PuffLoader } from "react-spinners";

function Salary() {
  const { totalPayment, loading } = useSelector((state) => state.paymentSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      const resp = await getPaymentDetails();
      dispatch(setTotalPayment(resp?.salary));
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

  const basicPay = totalPayment * 0.7;
  const ta = totalPayment * 0.1;
  const hra = totalPayment * 0.15;
  const deductions = totalPayment * 0.05;
  const bonuses = totalPayment * 0.1;
  const netSalary = basicPay + ta + hra + bonuses - deductions;

  return (
    <div className="container mx-auto py-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Salary Breakdown
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
                <td className="px-6 py-3">Basic Pay</td>
                <td className="px-6 py-3">{basicPay.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.7 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Travel Allowance (TA)</td>
                <td className="px-6 py-3">{ta.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.1 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">House Rent Allowance (HRA)</td>
                <td className="px-6 py-3">{hra.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.15 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Deductions</td>
                <td className="px-6 py-3">{deductions.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.05 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3">Bonuses</td>
                <td className="px-6 py-3">{bonuses.toFixed(2)}</td>
                <td className="px-6 py-3">{(0.1 * 100).toFixed(2)}%</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="px-6 py-3 font-semibold">Net Salary</td>
                <td className="px-6 py-3 font-semibold">
                  {netSalary.toFixed(2)}
                </td>
                <td className="px-6 py-3 font-semibold">100%</td>
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          No payment details available
        </p>
      )}
    </div>
  );
}

export default Salary;
