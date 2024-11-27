import logo from '../../assets/Captura_de_pantalla_2024-11-15_094327-removebg-preview.png';
import './Header.scss';

const Header = () => {
    return (
        <header className="header-content bg-tertiary-light text-black flex items-center">
            <div className="logo-container ml-[7rem]">
                <img src={ logo } alt="TaskMaster" className='h-[3.5rem] w-auto mb-[0.2rem]' />
            </div>
        </header>
    );
}

export default Header;