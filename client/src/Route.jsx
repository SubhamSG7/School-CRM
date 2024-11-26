import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./Pages/Signup";
import PersonalDetails from "./Components/PersonalDetails";
import ClassRoom from "./Components/ClassRoom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import AddClass from "./Pages/AddClass";

const router = createBrowserRouter([
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
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
]);
export function AllRoutes() {
  return <RouterProvider router={router} />;
}
