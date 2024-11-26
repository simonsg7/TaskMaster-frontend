import { Link } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const Home = () => {
    return (
        <>
            <Header />
            <Sidebar />
            <div className='home h-screen w-screen'>
                <div className="flex flex-col justify-center items-center h-screen w-screen">
                    <h1 className="text-4xl font-bold mb-6">¡Hello, World!</h1>
                    <div className='flex flex-col'>
                        <Link to="/login" className='text-blue-600 hover:text-blue-800'>Login</Link>
                        <Link to="users" className='text-blue-600 hover:text-blue-800'>Users</Link>
                        <Link to="tasks" className='text-blue-600 hover:text-blue-800'>Tasks</Link>
                        <Link to="projects" className='text-blue-600 hover:text-blue-800'>Projects</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;