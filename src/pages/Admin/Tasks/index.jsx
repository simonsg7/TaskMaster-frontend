import React from 'react';
import { Link } from 'react-router-dom';

const Tasks = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold">Hello Tasks</h1>
            <Link to="/">Inicio</Link>
            <br />
            <Link to="users">Users</Link>
            <br />
            <Link to="projects">Projects</Link>
        </div>
    );
}

export default Tasks;