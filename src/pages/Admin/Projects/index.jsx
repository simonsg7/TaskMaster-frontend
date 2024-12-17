import React from 'react';
import { Link } from 'react-router-dom';

const Projects = (props) => {
    return (
        <div>
            <h1 className="text-4xl font-bold">Hello Projects</h1>
            <Link to="/">Inicio</Link>
            <br />
            <Link to="users">Users</Link>
            <br />
            <Link to="tasks">Tasks</Link>
        </div>
    );
}

export default Projects;