import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
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
        return errors[name] && <small className="p-error">{errors[name].message}</small>;
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <div className='p-2'>
                    <InputText {...register("first_name", {required: true})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder="Name"  />
                    <InputText {...register("last_name", {required: true})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder="Last Name"  />
                </div>
                <div className='p-2'>
                    <Dropdown value={selectedTypeDocument} onChange={(e) => {setSelectedTypeDocument(e.value); setValue('type_document', e.value);}} options={typeDocument} placeholder='Type Document' className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" />
                    <InputText {...register("number_document", {required: true})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Number Document' />
                </div>
                <div className='p-2'>
                    <InputText {...register("email", {required: true, pattern: {value: /^\S+@\S+$/i, message: "Entered value does not match email format"}})} type="email" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder='Email' />
                    <InputText {...register("phone", {required: false})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Phone' />
                </div>
                <div className='p-2 flex items-center justify-between w-[26.1rem] h-[4rem]'>
                    <InputText {...register("password", {required: true, minLength: {value: 4, message: "min length is 4"}})} type="password" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Password' />
                    <div className='mr-5'>
                        <Button1 label="Register" className='m-[1rem] w-[7.5rem]' />
                    </div>
                </div>
            </form>
        </>
        // <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center p-4 gap-4'>
        //     <div className='flex gap-4'>
        //         <Controller name="first_name" control={control} rules={{ required: 'El nombre es requerido.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <InputText {...field} placeholder="Nombre" className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //         <Controller name="last_name" control={control} rules={{ required: 'El apellido es requerido.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <InputText {...field} placeholder="Apellido" className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //     </div>
        //     <Controller name="email" control={control} rules={{ required: 'El email es requerido.', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido.' } }} render={({ field, fieldState }) => (
        //         <div className="flex flex-col w-full">
        //             <InputText {...field} placeholder="Email" className={classNames({ 'p-invalid': fieldState.error }, 'w-full')} />
        //             {getFormErrorMessage(field.name)}
        //         </div>
        //     )} />
        //     <div className='flex gap-4'>
        //         <Controller name="password" control={control} rules={{ required: 'La contraseña es requerida.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <Password {...field} placeholder="Contraseña" feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //         <Controller name="password_confirmation" control={control} rules={{ required: 'Confirme la contraseña.', validate: value => value === password || 'Las contraseñas no coinciden.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <Password {...field} placeholder="Confirmar Contraseña" feedback={false} toggleMask className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //     </div>
        //     <div className='flex gap-4'>
        //         <Controller name="document_type" control={control} rules={{ required: 'Seleccione un tipo.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <Dropdown {...field} options={typeDocument} placeholder="Tipo Doc." className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //         <Controller name="document_number" control={control} rules={{ required: 'El documento es requerido.' }} render={({ field, fieldState }) => (
        //             <div className="flex flex-col">
        //                 <InputText {...field} placeholder="N° Documento" keyfilter="int" className={classNames({ 'p-invalid': fieldState.error })} />
        //                 {getFormErrorMessage(field.name)}
        //             </div>
        //         )} />
        //     </div>
        //     <Controller name="phone_number" control={control} rules={{ required: 'El teléfono es requerido.' }} render={({ field, fieldState }) => (
        //         <div className="flex flex-col w-full">
        //             <InputText {...field} placeholder="Teléfono" keyfilter="int" className={classNames({ 'p-invalid': fieldState.error }, 'w-full')} />
        //             {getFormErrorMessage(field.name)}
        //         </div>
        //     )} />

        //     <Button1 label="Registrarse" type="submit" className='m-[1rem]' loading={mutation.isLoading} />
        // </form>
    );
};

export default FormRegister;