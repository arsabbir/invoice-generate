import MainLayout from "../component/mainLayout/MainLayout.tsx";
import Client from "../pages/client/Client.tsx";
import Home from "../pages/home/Home.tsx";
import InvoiceAdd from "../pages/invoice/InvoiceAdd.tsx";
import InvoiceList from "../pages/invoice/InvoiceList.tsx";
import InvoiceTemplate from "../pages/invoice/InvoiceTemplate.tsx";
import Setting from "../pages/setting/Setting.tsx";

import PrivateGuard from "./PrivateGard.tsx";

// create private route
const privateRoute = [
  {
    element: <MainLayout />,
    children: [
      {
        element: <PrivateGuard />,
        children: [
          {
            path: "/",
            element: <Home />,
          },
          {
            path: "/invoice-add",
            element: <InvoiceAdd />,
          },
          {
            path: "/invoice",
            element: <InvoiceList />,
          },
          {
            path: "/invoice-details",
            element: <InvoiceTemplate />,
          },
          {
            path: "/setting/:id",
            element: <Setting />,
          },

          {
            path: "/setting",
            element: <Setting />,
          },
          {
            path: "/client",
            element: <Client />,
          },
        ],
      },
    ],
  },
];

// export default
export default privateRoute;
