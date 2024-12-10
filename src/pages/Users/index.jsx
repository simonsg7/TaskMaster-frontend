import React from 'react';
import { Link } from 'react-router-dom';

const Users = () => {
    return (
        <div className='flex flex-col items-center'>
            <h1 className="text-4xl font-bold">Hello Users</h1>
            <Link to="/">Inicio</Link>
            <Link to="projects">Projects</Link>
            <Link to="tasks">Tasks</Link>
        </div>
    );
}

export default Users;