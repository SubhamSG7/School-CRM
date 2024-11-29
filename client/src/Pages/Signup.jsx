import React, { useEffect } from "react";
import {
  addInfo,
  clearResponse,
  sendSignupData,
  setRole,
  validate,
} from "../Redux/Slices/SignupSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { role, classes, subjects, error, userInfo, backendResponse } =
    useSelector((state) => state.signupslice);

  useEffect(() => {
    if (backendResponse.message === "SuccessFully Registered") {
      dispatch(clearResponse());
      navigate("/login");
    }
  }, [backendResponse, dispatch, navigate]);

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.keys(error).length === 0) {
      const dataToSend = {
        ...userInfo,
        role,
      };
      dispatch(sendSignupData(dataToSend));
    }
  }

  useEffect(() => {
    const lastEntry = Object.entries(error).pop();
    if (lastEntry) {
      toast.error(`${lastEntry[1]}`, {
        position: "top-center",
        autoClose: 3000,
      });
    }
  }, [error]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-4">Signup Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <p>Signup as:</p>
          <select
            name="role"
            value={role || "not selected"}
            onChange={(e) => dispatch(setRole(e.target.value))}
            required
            className="w-full bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          >
            <option value="not selected" disabled>
              Select
            </option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="w-full mb-6 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-6 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        <label htmlFor="DOB" className="block mb-1">
          DOB
        </label>
        <input
          type="date"
          name="dob"
          id="DOB"
          className="w-full mb-6 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        <div className="flex gap-4 mb-6">
          <select
            name="country-code"
            className="w-1/3 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          >
            <option value="+91">+91 (IND)</option>
          </select>
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            className="w-2/3 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
            onChange={(e) =>
              dispatch(addInfo({ name: e.target.name, value: e.target.value }))
            }
            onBlur={(e) => dispatch(validate(e.target.name))}
          />
        </div>
        <div className="mb-6">
          <label className="mr-4">
            <input
              type="radio"
              name="gender"
              value="male"
              onChange={(e) =>
                dispatch(
                  addInfo({ name: e.target.name, value: e.target.value })
                )
              }
              onBlur={(e) => dispatch(validate(e.target.name))}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              onChange={(e) =>
                dispatch(
                  addInfo({ name: e.target.name, value: e.target.value })
                )
              }
              onBlur={(e) => dispatch(validate(e.target.name))}
            />
            Female
          </label>
        </div>
        <label htmlFor="class-select" className="block mb-1">
          Select Class:
        </label>
        <select
          name="class"
          id="class-select"
          value={userInfo.class || "Select-class"}
          className="w-full mb-6 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        >
          <option value="Select-class" disabled>
            Select-Class
          </option>
          {classes.map((val, index) => (
            <option value={val} key={index}>
              Class - {val}
            </option>
          ))}
        </select>
        {role === "Teacher" && (
          <div className="mb-6">
            <label htmlFor="select-subject" className="block mb-1">
              Select Subject:
            </label>
            <select
              name="subject"
              id="select-subject"
              value={userInfo.subject || "Select-Subject"}
              className="w-full bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
              onChange={(e) =>
                dispatch(
                  addInfo({ name: e.target.name, value: e.target.value })
                )
              }
              onBlur={(e) => dispatch(validate(e.target.name))}
            >
              <option value="Select-Subject" disabled>
                Select-Subject
              </option>
              {subjects.map((val, index) => (
                <option value={val} key={index}>
                  {val}
                </option>
              ))}
            </select>
          </div>
        )}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-6 bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-orange-300"
          onChange={(e) =>
            dispatch(addInfo({ name: e.target.name, value: e.target.value }))
          }
          onBlur={(e) => dispatch(validate(e.target.name))}
        />
        {role !== "not selected" && (
          <button
            type="submit"
            className="w-full text-black border-b-2 border-gray-300 py-2 focus:outline-none hover:border-orange-300"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}

export default Signup;
