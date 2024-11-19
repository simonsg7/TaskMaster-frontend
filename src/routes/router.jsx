import * as React from "react";
// import { createRoot } from "react-dom/client";
import {
    createBrowserRouter,
    // RouterProvider,
    // Route,
    Link,
} from "react-router-dom";
import App from "../App";
import Users from "../pages/Users";
import Tasks from "../pages/Tasks";
import Projects from "../pages/Projects";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <div>
                <h1>Hello World</h1>
                <Link to="about">About Us</Link>
                <br />
                <Link to="users">Users</Link>
                <br />
                <Link to="tasks">Tasks</Link>
                <br />
                <Link to="projects">Projects</Link>
            </div>
        ),
    },
    {
        path: "about",
        element: <App />,
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

export default router;
