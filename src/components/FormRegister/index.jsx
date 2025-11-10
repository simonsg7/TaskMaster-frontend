import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

import Button1 from '../Button1';
import { handleApiErrors } from '../../api/handleApiErrors';
import { urlRegister } from '../../api/backendUrls';

const FormRegister = ({ close }) => {
    const navigate = useNavigate();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            password_confirmation: '',
            type_document: null,
            number_document: '',
            phone: ''
        }
    });

    const [selectedTypeDocument, setSelectedTypeDocument] = useState(null);

    const typeDocument = [
        { label: 'C.C', value: 'C.C' },
        { label: 'C.E', value: 'C.E' },
        { label: 'T.I', value: 'T.I' },
    ];

    const mutation = useMutation(
        async (data) => {
            const payload = {
                ...data,
                document_type: data.type_document.value
            };
            const response = await axios.post(urlRegister, payload);
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log("Registro exitoso:", data);
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.response.id);
                localStorage.setItem("userDetailId", data.user_detail_id);
                localStorage.setItem("imageUrl", data.imageUrl);

                if (close) close();
                navigate('/profile');
            },
            onError: (error) => {
                handleApiErrors(error);
                console.error("Error en el registro:", error.message);
            }
        }
    );

    const onSubmit = (data) => {
        mutation.mutate(data);
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <span className="text-[0.85rem]">This is required</span>;
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <div className='p-2 flex'>
                    <div>
                        <InputText {...register("first_name", {required: true})} type="text" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder="Name"  />
                        <br />
                        {getFormErrorMessage("first_name")}
                    </div>
                    <div>
                        <InputText {...register("last_name", {required: true})} type="text" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder="Last Name"  />
                        <br />
                        {getFormErrorMessage("last_name")}
                    </div>
                </div>
                <div className='p-2'>
                    <Dropdown value={selectedTypeDocument} onChange={(e) => {setSelectedTypeDocument(e.value); setValue('type_document', e.value);}} options={typeDocument} placeholder='Type Document' className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" />
                    <InputText {...register("number_document", {required: true})} type="text" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Number Document' />
                </div>
                <div className='p-2 flex'>
                    <div>
                        <InputText {...register("email", {required: true, pattern: {value: /^\S+@\S+$/i, message: "Entered value does not match email format"}})} type="email" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder='Email' />
                        <br />
                        {getFormErrorMessage("email")}
                    </div>
                    <InputText {...register("phone", {required: false})} type="text" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Phone' />
                </div>
                <div className='p-2 flex items-center justify-between w-[26.1rem] h-[4rem]'>
                    <div>
                        <InputText {...register("password", {required: true, minLength: {value: 4, message: "min length is 4"}})} type="password" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Password' />
                        <br />
                        {getFormErrorMessage("password")}
                    </div>
                    <div className='mr-5'>
                        <Button1 label="Register" className='m-[1rem] w-[7.5rem]' />
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormRegister;