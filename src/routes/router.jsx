// import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    RouterProvider,
    // Route,
    // Link,
} from "react-router-dom";
import Users from "../pages/Users";
import Tasks from "../pages/Tasks";
import Projects from "../pages/Projects";
import Home from "../pages/Home";
import Login from "../pages/Login";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
        path: "login",
        element: <Login />,
    },
    {
        path: "users",
        element: <Users />,
    },
    {
        path: "tasks",
        element: <Tasks />,
    },
    {
        path: "projects",
        element: <Projects />,
    },
]);

const Router = () => {
    return (
        <div>
            <RouterProvider router={router} />
        </div>
    );
}

export default Router;