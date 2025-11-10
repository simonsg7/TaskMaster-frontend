import React, { useState } from 'react';
import { useForm, Controller} from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import createProject from '../../services/Projects/createProjects';
import { handleApiErrors } from '../../api/handleApiErrors';
import Button1 from '../Button1';

const FormCreateProject = ({ close }) => {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const queryClient = useQueryClient();

    const categories = [
        { label: 'Trabajo', value: 'trabajo' },
        { label: 'Personal', value: 'personal' },
        { label: 'Estudio', value: 'estudio' },
        { label: 'Finanzas', value: 'finanzas' },
        { label: 'Salud y Bienestar', value: 'salud y bienestar' },
        { label: 'Viajes', value: 'viajes' },
        { label: 'Hogar', value: 'hogar' },
        { label: 'Social', value: 'social' },
    ];

    const priorities = [
        { label: 'Baja', value: 'baja' },
        { label: 'Media', value: 'media' },
        { label: 'Alta', value: 'alta' },
    ];

    const states = [
        { label: 'To Do', value: 'pendiente' },
        { label: 'Doing', value: 'en progreso' },
        { label: 'Done', value: 'completo' },
    ];

    const mutation = useMutation(createProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projectsAndTasks');
            if (close) close();
        },
        onError: (error) => {
            handleApiErrors(error);
            console.error("Error creating project:", error.message);
        }
    });

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
                        <InputText {...register("name", {required: true})} type="text" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder="Project Name"  />
                        <br />
                        {getFormErrorMessage("name")}
                    </div>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: false }}
                        render={({ field }) => (
                            <Dropdown
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                                options={categories}
                                placeholder='Select Category'
                                className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput"
                            />
                        )}
                    />
                </div>
                <div className='p-2 flex'>
                    <div>
                        <Controller
                            name="priority"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Dropdown
                                    value={field.value}
                                    onChange={(e) => field.onChange(e.value)}
                                    options={priorities}
                                    placeholder='Select Priority'
                                    className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4"
                                />
                            )}
                        />
                        <br />
                        {getFormErrorMessage("priority")}
                    </div>
                    <div>
                        <InputText {...register("expectation_date", {required: true})} type="date" className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" />
                        <br />
                        {getFormErrorMessage("expectation_date")}
                    </div>
                </div>
                <div className='flex'>
                    <div className='pt-2 pl-2 pr-2'>
                        <InputTextarea {...register("description", {required: false})} type="text" className="w-[12rem] h-[6rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Description' />
                    </div>
                    <div className='flex flex-col pt-2 pr-2 pl-2'>
                        <div>
                            <Controller
                                name="state"
                                control={control}
                                rules={{ required: true }}
                                render={({ field }) => (
                                    <Dropdown
                                        value={field.value}
                                        onChange={(e) => field.onChange(e.value)}
                                        options={states}
                                        placeholder='Select State'
                                        className="h-[2.4rem] w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput"
                                    />
                                )}
                            />
                            <br />
                            {getFormErrorMessage("state")}
                        </div>
                        <Button1 label="Crear" className='m-[1rem]' />
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormCreateProject;