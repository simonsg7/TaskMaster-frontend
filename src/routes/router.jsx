import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Users from "../pages/Users";
import Tasks from "../pages/Tasks";
import Projects from "../pages/Projects";
import Home from "../pages/Home";
import Login from "../pages/Login";
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