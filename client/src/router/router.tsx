import { createBrowserRouter } from "react-router-dom";
import publicRoute from "./publicRouter";
import privateRoute from "./PrivateRouter.tsx";

// create browser route
const router = createBrowserRouter([...publicRoute, ...privateRoute]);

// export default
export default router;
