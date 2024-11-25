import './Sidebar.scss';
import { Link } from 'react-router-dom';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093948-removebg-preview.png'

const Sidebar = () => {
    return (
        <div className='container-sidebar bg-primary text-tertiary-light'>
            <div className='flex justify-center'>
                <img src={ logo } alt="Logo" className='h-[4rem] w-auto' />
            </div>
            <div className='container-links mt-[15rem]'>
                <Link to="/users" className="mb-3">Users</Link>
                <Link to="/tasks" className="mb-3">Tasks</Link>
                <Link to="/projects" className="mb-3">Projects</Link>
            </div>
        </div>
    );
}

export default Sidebar;