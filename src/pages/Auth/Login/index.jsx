import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.scss';
import logo from '../../../assets/Captura_de_pantalla_2024-11-15_093642-removebg-preview.png';
import { urlLogin } from "../../../api/backendUrls";
import { handleApiErrors } from "../../../api/handleApiErrors";
import Button1 from "../../../components/Button1";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(urlLogin, data);
            localStorage.setItem("token", (response.data.token));
            localStorage.setItem("userId", (response.data.user.id));            
            localStorage.setItem("imageUrl", response.data.user.image_url);
            navigate('/');
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

                    <Button1 className="w-[7.5rem] mt-[1rem]" label="Login" />
                </form>
            </div>
        </div>
    );
}

export default Login;