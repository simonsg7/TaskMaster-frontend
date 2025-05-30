import React from 'react';
import { Button } from 'primereact/button';

const Button1 = ({ className, label, onClick }) => {
    return (
        <>
            <Button text raised rounded className={`${className} bg-primary-light text-tertiary-light hover:bg-white hover:text-primary-light p-[0.7rem]`} label={`${label}`} onClick={onClick} />
        </>
    );
}

export default Button1;