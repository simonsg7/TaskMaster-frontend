import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../pages/Admin/Users";
import Tasks from "../pages/Admin/Tasks";
import Projects from "../pages/Admin/Projects";
import Home from "../pages/Admin/Home";
import Login from "../pages/Auth/Login";
import AdminLayout from "../pages/Admin";

const router = createBrowserRouter([
    {
        element: <AdminLayout />,
        children: [
            {
                path: "/",
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
        ],
    },
    
    {
        path: "login",
        element: <Login />,
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