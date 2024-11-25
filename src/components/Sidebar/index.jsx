import 'primeicons/primeicons.css';
import { Link } from 'react-router-dom';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093948-removebg-preview.png'
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <div className='container-sidebar bg-primary text-tertiary-light'>
            <div className='mt-[0.7rem] flex justify-center'>
                <img src={ logo } alt="Logo" className='h-[4rem] w-auto' />
            </div>
            <div className='container-links mt-[15rem]'>
                <Link to="/users" className="pi pi-user text-[1.8rem] hover:bg-secondary-light hover:text-primary"></Link>
                <Link to="/projects" className="pi pi-briefcase text-[1.8rem] hover:bg-secondary-light hover:text-primary"></Link>
                <Link to="/tasks" className="pi pi-book text-[1.8rem] hover:bg-secondary-light hover:text-primary"></Link>
            </div>
        </div>
    );
}

export default Sidebar;