import { useForm } from "react-hook-form";
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import './Login.scss';
import logo from '../../../assets/Captura_de_pantalla_2024-11-15_093642-removebg-preview.png';
import { urlLogin } from "../../../api/backendUrls";
import { handleApiErrors } from "../../../api/handleApiErrors";
import Button1 from "../../../components/Button1";
import FormRegister from "../../../components/FormRegister";
import Modal from "../../../components/Modal";

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(urlLogin, data);
            localStorage.setItem("token", (response.data.token));
            localStorage.setItem("userId", (response.data.user.id));         
            localStorage.setItem("userDetailId", (response.data.user.user_detail_id));         
            localStorage.setItem("imageUrl", response.data.user.image_url);
            console.log(response);
            navigate('/profile');
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
                <form onSubmit= {handleSubmit(onSubmit)} className="w-[30rem] flex flex-col items-center p-[3rem]">
                    <div className="w-[20rem] flex flex-col items-center">
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
                    </div>

                    <div className="w-[20rem] flex justify-around">
                        <div className="p-1">
                            <Button1 className="w-[7.5rem] mt-[0.5rem] mb-[1rem]" label="Login" /> 
                        </div>
                        <div className="p-1">
                            <Button1 className="w-[7.5rem] mt-[0.5rem] mb-[1rem]" label="Register" title="Don't you have an account?" onClick={() => setIsRegisterModalOpen(true)} />
                        </div>
                    </div>
                </form>
            </div>
            <Modal title="New User" isOpen={isRegisterModalOpen} onClose={() => setIsRegisterModalOpen(false)}>
                {({ close }) => (
                    <FormRegister close={close} />
                )}
            </Modal>
        </div>
    );
}

export default Login;