import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../pages/Admin/Users";
import Tasks from "../pages/Admin/Tasks";
import Projects from "../pages/Admin/Projects";
import Home from "../pages/Admin/Home";
import Login from "../pages/Auth/Login";
import AdminLayout from "../pages/Admin";
import UserProfile from "../pages/UserProfile";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
    },

    {
        element: <AdminLayout />,
        children: [
            {
                path: "home",
                element: <Home />
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
            {
                path: "profile",
                element: <UserProfile />,
            },
        ],
    },
]);

const Router = () => {
    return (
        <div>
            <RouterProvider router={ router } />
        </div>
    );
}

export default Router;