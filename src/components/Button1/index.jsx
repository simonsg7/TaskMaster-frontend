import React from 'react';
import { Button } from 'primereact/button';

const Button1 = ({ className, label }) => {
    return (
        <>
            <Button text raised rounded className={`${className} bg-primary-light text-tertiary-light hover:bg-white hover:text-primary-light p-[0.7rem]`} label={`${label}`} />
        </>
    );
}

export default Button1;