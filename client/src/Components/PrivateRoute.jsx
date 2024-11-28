import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HashLoader } from "react-spinners";
import UnAuthorised from "./UnAthorised";
function PrivateRoute({ children }) {
  const location = useLocation();
  const accessPath = location.pathname;
  const role = localStorage.getItem("role");
  const url = import.meta.env.VITE_BackendURL;
  const [loading, setLoading] = useState(true);
  const [authorise, setAuthorised] = useState("");
  async function checkAuth() {
    try {
      const resp = await axios.post(
        `${url}/api/auth`,
        { path: accessPath, role: role },
        { withCredentials: true }
      );
      setAuthorised(resp?.data?.message);
      setLoading(false);
    } catch (error) {
      console.log("Not authenticated");
      setLoading(false);
      setAuthorised("Unauthorized");
    }
  }
  useEffect(() => {
    checkAuth();
  }, []);
  if (loading)
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <HashLoader />
      </div>
    );
  if (authorise === "Unauthorized") {
    return <UnAuthorised />;
  }
  return <>{children}</>;
}

export default PrivateRoute;
