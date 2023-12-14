import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Helmet } from "react-helmet";
import router from "./router/router.tsx";
import { useGetLoggedUserQuery } from "./feature/auth/authApiSlice.ts";
import { useGetSettingQuery } from "./feature/setting/settingApiSlice.ts";

function App() {
  const { data: user, error, isLoading } = useGetLoggedUserQuery("");
  const { data: settingData } = useGetSettingQuery("");
  const firstSetting = settingData && settingData[0];
  console.log(firstSetting);

  useEffect(() => {
    if (error) {
      console.error("Error fetching logged-in user:", error);
    }

    if (!isLoading && user) {
      console.log("Logged-in user:", user);
    }
  }, [user, error, isLoading]);

  return (
    <>
      <Helmet>
        <title>{firstSetting?.title}</title>
        <link
          rel="shortcut icon"
          href={
            firstSetting?.favicon ||
            "https://www.pngall.com/wp-content/uploads/5/Facebook-Messenger-Logo-PNG-High-Quality-Image.png"
          }
        />
      </Helmet>
      <RouterProvider router={router} />

      <ToastContainer />
    </>
  );
}

export default App;
