import { createBrowserRouter } from "react-router-dom";
import Login from "screens/auth/login";
import Home from "screens/main";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/main",
        element: <Home />
    },
    {
        path: "/auth/login",
        element: <Login />
    }
]);

export default router;
