import { Navigate, Outlet } from "react-router-dom";
import { useGetLoggedUserQuery } from "../feature/auth/authApiSlice.ts";

const PrivateGard = () => {
  const { data: user, isLoading } = useGetLoggedUserQuery("ok");
  if (isLoading) {
    console.log("okk");

    // Use Ant Design Spin component for loading indicator
    return <div className="full-screen-overlay"></div>;
  }
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateGard;
