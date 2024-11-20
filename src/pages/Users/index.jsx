import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div>
            <h1 className="text-4xl font-bold">Hello Users</h1>
            <Link to="/">Inicio</Link>
            <br />
            <Link to="projects">Projects</Link>
            <br />
            <Link to="tasks">Tasks</Link>
        </div>
    );
}

export default Users;