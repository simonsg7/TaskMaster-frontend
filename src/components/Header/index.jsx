import { Link } from 'react-router-dom';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093948-removebg-preview.png';
import './Header.scss';

const Header = () => {
    return (
        <header className="header-content bg-tertiary text-black flex justify-between items-center p-4">
            <div className="logo-container flex items-center">
                <img src={ logo } alt="TaskMaster" className='h-[10rem] w-auto' />
            </div>
            <nav className="navigation">
                <Link to="/" className="text-black hover:text-secondary">Inicio</Link>
                <Link to="/users" className="text-black hover:text-secondary ml-4">Usuarios</Link>
                <Link to="/projects" className="text-black hover:text-secondary ml-4">Proyectos</Link>
                <Link to="/tasks" className="text-black hover:text-secondary ml-4">Tareas</Link>
                <Link to="/login" className="text-black hover:text-secondary ml-4">Login</Link>
            </nav>
        </header>
    );
}

export default Header;