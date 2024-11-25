import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093948-removebg-preview.png'
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <div className='container-sidebar bg-primary text-tertiary-light'>
            <div className='flex justify-center'>
                <img src={ logo } alt="Logo" className='h-[4rem] w-auto' />
            </div>
            <div className='container-links mt-[15rem]'>
                <Link to="/users" className="mb-7 pi pi-user text-[1.8rem] text-tertiary-light"></Link>
                <Link to="/projects" className="mb-7 pi pi-briefcase text-[1.8rem] text-tertiary-light"></Link>
                <Link to="/tasks" className="mb-7 pi pi-book text-[1.8rem] text-tertiary-light"></Link>
            </div>
        </div>
    );
}

export default Sidebar;