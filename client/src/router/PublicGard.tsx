import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUserQuery } from "../feature/auth/authApiSlice.ts";

const PublicGard = () => {
  const { data: user, isLoading } = useGetLoggedUserQuery("ok");
  if (isLoading) {
    // Use Ant Design Spin component for loading indicator
    return <div className="full-screen-overlay"></div>;
  }
  if (localStorage.getItem("user")) {
    return user ? <Navigate to="/" /> : <Outlet />;
  }

  return <Outlet />;
};

export default PublicGard;
