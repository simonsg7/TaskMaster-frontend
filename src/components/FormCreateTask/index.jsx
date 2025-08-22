import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { InputTextarea } from 'primereact/inputtextarea';
        

import { urlCreateTask } from '../../api/backendUrls';
import { handleApiErrors } from '../../api/handleApiErrors';
import Button1 from '../Button1';

const FormCreateTask = () => {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
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
        { label: 'Done', value: 'completa' },
    ];

    const onSubmit = async (data) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(urlCreateTask, data, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (response.status === 201) {
                console.log("Task created successfully:", response.data);
            }
        } catch (error) {
            handleApiErrors(error);
            console.error("Error creating task:", error.message);
        }
    };

    return (
        <>
        {/* name, category (trabajo, personal, estudio, finanzas, salud y bienestar, viajes, hogar, social), description, priority(baja, media, alta), expectation_date, state(diario, pendiente, en progreso, completa) */}
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <div className='p-2'>
                    <InputText {...register("name", {required: true})} type="text" className="w-[12rem] p-[0.3rem] border border-blue-300 hover:bg-bgInput mr-4" placeholder="Task Name"  />
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
                        <Button1 label="Crear" className='m-[1rem]' />
                    </div>
                </div>
            </form>
        </>
    );
}

export default FormCreateTask;