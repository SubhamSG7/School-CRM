import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Signup from "./Pages/Signup";
import PersonalDetails from "./Components/PersonalDetails";
import ClassRoom from "./Components/ClassRoom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import AddClass from "./Pages/AddClass";
import LandingPage from "./Pages/LandingPage";
import PrivateRoute from "./Components/PrivateRoute";
import Teachers from "./Components/Teachers";
import ClassAnalytics from "./Components/ClassAnalytics";
import IncomeAnalytics from "./Components/IncomeAnalytics";
import Profile from "./Pages/Profile";
import StudentFee from "./Components/StudentFee"; // hm
import Salary from "./Components/Salary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" />, // Redirect root route to login page
  },
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        index: true,
        path: "personaldetails",
        element: <PersonalDetails />,
      },
      {
        path: "classdetails",
        element: <ClassRoom />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "addclass",
        element: <AddClass />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "class",
        element: (
          <PrivateRoute>
            <ClassRoom />
          </PrivateRoute>
        ),
      },
      {
        path: "teachers",
        element: (
          <PrivateRoute>
            <Teachers />
          </PrivateRoute>
        ),
      },
      {
        path: "landingpage",
        element: (
          <PrivateRoute>
            <LandingPage />
          </PrivateRoute>
        ),
      },
      {
        path: "classanalytics",
        element: (
          <PrivateRoute>
            <ClassAnalytics />
          </PrivateRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "incomeanalytics",
        element: (
          <PrivateRoute>
            <IncomeAnalytics />
          </PrivateRoute>
        ),
      },
      {
        path: "feestructure",
        element: (
          <PrivateRoute>
            <StudentFee />
          </PrivateRoute>
        ),
      },
      {
        path: "salary",
        element: (
          <PrivateRoute>
            <Salary />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <div className="w-full h-100vh flex justify-center items-center">
        <p className="text-6xl text-red-600">Work In Progress</p>
      </div>
    ),
  },
]);
export function AllRoutes() {
  return <RouterProvider router={router} />;
}
