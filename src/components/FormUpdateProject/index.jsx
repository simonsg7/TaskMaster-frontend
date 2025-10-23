import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from 'react-query';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';

import updateProject from '../../services/Projects/updateProjects';
import { handleApiErrors } from '../../api/handleApiErrors';
import Button1 from '../Button1';

const FormUpdateProject = ({ project, close }) => {
    const queryClient = useQueryClient();

    const { register, handleSubmit, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (project) {
            setValue('name', project.title);
            setValue('description', project.description);
            setValue('expectation_date', project.expectation_date.split('T')[0]);
            setSelectedCategory(project.category);
            setSelectedPriority(project.priority);
            setSelectedState(project.state);
        }
    }, [project, setValue]);

    const [selectedCategory, setSelectedCategory] = useState(null);

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

        const [selectedPriority, setSelectedPriority] = useState(null);
        
        const priorities = [
            { label: 'Baja', value: 'baja' },
            { label: 'Media', value: 'media' },
            { label: 'Alta', value: 'alta' },
        ];

        const [selectedState, setSelectedState] = useState(null);
    
        const states = [
            { label: 'To Do', value: 'pendiente' },
            { label: 'Doing', value: 'en progreso' },
            { label: 'Done', value: 'completo' },
        ];

    const mutation = useMutation(updateProject, {
        onSuccess: () => {
            queryClient.invalidateQueries('projectsAndTasks');
            if (close) close();
        },
        onError: (error) => {
            handleApiErrors(error);
            console.error("Error updating project:", error.message);
        }
    });

    const onSubmit = (data) => {
        mutation.mutate({ projectId: project.id, data });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <div className='p-2'>
                    <InputText {...register("name", {required: true})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder="Project Name"  />
                    <Dropdown value={selectedCategory} onChange={(e) => {setSelectedCategory(e.value); setValue('category', e.value);}} options={categories} placeholder='Select Category' className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" />
                </div>
                <div className='p-2'>
                    <Dropdown value={selectedPriority} onChange={(e) => {setSelectedPriority(e.value); setValue('priority', e.value);}} options={priorities} placeholder='Select Priority' className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" />
                    <InputText {...register("expectation_date", {required: false})} type="date" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" />
                </div>
                <div className='flex'>
                    <div className='pt-2 pl-2 pr-2'>
                        <InputTextarea {...register("description", {required: false})} type="text" className="w-[12rem] h-[6rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" placeholder='Description' />
                    </div>
                    <div className='flex flex-col pt-2 pr-2 pl-2'>
                        <Dropdown value={selectedState} onChange={(e) => {setSelectedState(e.value); setValue('state', e.value);}} options={states} placeholder='Select State' className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput" />
                        <Button1 label="Actualizar" onClick={handleSubmit(onSubmit)} className='m-[1rem]' />
                    </div>
                </div>
            </form>
        </>
    );
};

export default FormUpdateProject;