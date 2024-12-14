import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import axios from 'axios';

import './Login.scss';
import logo from '../../assets/Captura_de_pantalla_2024-11-15_093642-removebg-preview.png';
import { urlLogin } from "../../api/backendUrls";
import { handleApiErrors } from "../../api/handleApiErrors";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(urlLogin, data);
            console.log(response.data);
            localStorage.setItem("Token", (response.data.token));
        } catch (error) {
            const errorResponse = handleApiErrors(error);
            console.error("Error during login:", errorResponse.message);
            alert(errorResponse.message);
        }
    }
    
    return (
        <div className='login-container bg-primary'>
            <div className='logo-container'>
                <img src={logo} alt="Logo" className='w-[40rem] h-auto' />
            </div>
            <div className='inferior-div flex justify-center items-center bg-tertiary-light rounded-t-[100px]'>
                <form onSubmit= {handleSubmit(onSubmit)} className="w-[22rem] flex flex-col items-center p-[3rem]">
                    <div className="p-2">
                        <InputText {...register("email", { required: true })} type="email" className="p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder="Email" />
                        <br />
                        {errors.email && (<span className="text-[0.85rem]">Is required</span>)}
                    </div>

                    <div className="p-2">
                        <InputText {...register("password", { required: true })} type="password" className="p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder="Password" />
                        <br />
                        {errors.password && (<span className="text-[0.85rem]">Is required</span>)}
                    </div>

                    <Button className="bg-primary-light text-tertiary-light hover:bg-white hover:text-primary-light w-[7.5rem] p-[0.7rem] mt-[1rem]" label="Login" text raised rounded />
                </form>
            </div>
        </div>
    );
}

export default Login;