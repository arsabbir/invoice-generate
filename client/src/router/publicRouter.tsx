import Login from "../pages/auth/Login.js";
import Register from "../pages/auth/Register.js";
import PublicGard from "./PublicGard.jsx";

// create public router
const publicRouter = [
  {
    element: <PublicGard />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
];

// export router
export default publicRouter;
