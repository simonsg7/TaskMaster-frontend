import './Login.scss';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093642-removebg-preview.png'

const Login = () => {
    return (
        <div className='login-container bg-primary'>
            <div className='logo-container'>
                <img src={logo} alt="Logo" className='w-[40rem] h-auto' />
            </div>
            <div className='inferior-div bg-tertiary-light rounded-t-[100px]'>
            </div>
        </div>
    );
}

export default Login;