import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBackendResponse,
  sendLoginData,
  setLogingCredentials,
  setRole,
  validate,
} from "../Redux/Slices/LoginSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logincredential, validationError, role, backendResponse } =
    useSelector((state) => state.loginSlice);

  function handleLogin(e) {
    e.preventDefault();

    // If no validation errors, proceed with login
    if (Object.keys(validationError).length === 0) {
      const dataToSend = {
        ...logincredential,
        role,
      };
      dispatch(sendLoginData(dataToSend));
    }
  }

  useEffect(() => {
    // Redirect after successful login
    if (backendResponse?.message === "Login successful") {
      localStorage.setItem("role", role);
      dispatch(clearBackendResponse());
      window.dispatchEvent(new Event("storage"));
      navigate("/landingpage");
    } else if (backendResponse?.message) {
      toast.error(backendResponse.message);
      dispatch(clearBackendResponse());
    }
  }, [backendResponse, dispatch]);

  useEffect(() => {
    // Show validation errors if any
    if (validationError) {
      Object.values(validationError).forEach((error) => toast.error(error));
    }
  }, [validationError]);

  return (
    <div className="flex w-screen h-screen justify-center items-center bg-gray-100">
      <ToastContainer />
      <form
        onSubmit={handleLogin}
        className="flex flex-col bg-white w-full max-w-md p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">
          Login to your account
        </h2>

        {/* Role Selection */}
        <div className="mb-6">
          <label
            htmlFor="role"
            className="block text-gray-700 font-semibold mb-2"
          >
            Login as
          </label>
          <select
            id="role"
            name="role"
            value={role || ""}
            onChange={(e) => dispatch(setRole(e.target.value))}
            required
            className="w-full bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Class">Class</option>
          </select>
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={logincredential?.email || ""}
            onChange={(e) =>
              dispatch(
                setLogingCredentials({
                  name: e.target.name,
                  value: e.target.value,
                })
              )
            }
            onBlur={(e) => dispatch(validate(e.target.name))}
            className="w-full bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Password Input */}
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={logincredential?.password || ""}
            onChange={(e) =>
              dispatch(
                setLogingCredentials({
                  name: e.target.name,
                  value: e.target.value,
                })
              )
            }
            onBlur={(e) => dispatch(validate(e.target.name))}
            className="w-full bg-transparent px-0 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 text-gray-700"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-lg text-gray-700 font-semibold py-2 border-b-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 transition-all"
        >
          Login
        </button>

        {/* Link for Registration */}
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>
            Do not have an account?{" "}
            <Link to="/signup" className="text-blue-500 hover:text-blue-700">
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;
