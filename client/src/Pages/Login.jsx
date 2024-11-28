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
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { logincredential, validationError, role, backendResponse } =
    useSelector((state) => state.loginSlice);
  function handleLogin(e) {
    e.preventDefault();

    if (Object.keys(validationError).length === 0) {
      const dataToSend = {
        ...logincredential,
        role,
      };
      dispatch(sendLoginData(dataToSend));
    }
  }

  useEffect(() => {
    if (backendResponse?.message === "Login successful") {
      localStorage.setItem("role", role);
      dispatch(clearBackendResponse());
      navigate("/landingpage");
    } else if (backendResponse?.message) {
      toast.error(backendResponse.message);
      dispatch(clearBackendResponse());
    }
  }, [backendResponse, dispatch]);

  useEffect(() => {
    if (validationError) {
      Object.values(validationError).forEach((error) => toast.error(error));
    }
  }, [validationError]);

  return (
    <div>
      <ToastContainer />
      <form onSubmit={handleLogin}>
        <div>
          <p>Login as a </p>
          <select
            name="role"
            value={role || ""}
            onChange={(e) => dispatch(setRole(e.target.value))}
            required
          >
            <option value="" disabled>
              Select
            </option>
            <option value="Teacher">Teacher</option>
            <option value="Student">Student</option>
            <option value="Class">Class</option>
          </select>
        </div>
        <input
          type="email"
          placeholder="Email"
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
          onBlur={(e) => {
            dispatch(validate(e.target.name));
          }}
        />
        <input
          type="password"
          placeholder="Password"
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
          onBlur={(e) => {
            dispatch(validate(e.target.name));
          }}
        />
        {role && role !== "not selected" && <input type="submit" />}
      </form>
    </div>
  );
}

export default Login;
