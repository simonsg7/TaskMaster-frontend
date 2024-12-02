import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import './Login.scss';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093642-removebg-preview.png'

const Login = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => console.log(data);
    

    return (
        <div className='login-container bg-primary'>
            <div className='logo-container'>
                <img src={logo} alt="Logo" className='w-[40rem] h-auto' />
            </div>
            <div className='inferior-div flex justify-center items-center bg-tertiary-light rounded-t-[100px]'>
                <div className="form">
                    <form onSubmit= {handleSubmit(onSubmit)}>
                        <input {...register("email")} />
                        <input {...register("password")} />
                        <InputText {...register("ensayo")} />
                        <input type="submit" />
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;