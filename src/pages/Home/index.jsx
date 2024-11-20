import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-6">¡Hello, World!</h1>
            <div className='flex flex-col'>
                <Link to="about" className='text-blue-600 hover:text-blue-800'>About Us</Link>
                <Link to="users" className='text-blue-600 hover:text-blue-800'>Users</Link>
                <Link to="tasks" className='text-blue-600 hover:text-blue-800'>Tasks</Link>
                <Link to="projects" className='text-blue-600 hover:text-blue-800'>Projects</Link>
            </div>
        </div>
    );
}

export default Home;