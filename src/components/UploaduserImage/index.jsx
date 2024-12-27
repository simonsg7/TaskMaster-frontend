import React, { useState, useEffect } from 'react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Button } from 'primereact/button';

const UploadUserImage = (props) => {
    const [imageUrl, setImageUrl] = useState('');
    const [uploadWidget, setUploadWidget] = useState(null);

    const cld = new Cloudinary({
        cloud: {
            cloudName: 'dm0g4d64z',
        },
    });

    const initUploadWidget = () => {
        const widget = window.cloudinary.createUploadWidget({
            cloudName: 'dm0g4d64z',
            uploadPreset: 'TaskMaster388',
            sources: ['local', 'url', 'camera'],
            multiple: false,
            showAdvancedOptions: false,
            cropping: true,
            defaultSource: 'local',
        }, (error, result) => {
            if (!error && result && result.event === "success") {
                const url = cld.image(result.info.public_id).toURL();
                setImageUrl(url);
            } else {
                console.error('Error en la carga:', error);
            }
        });

        setUploadWidget(widget);
    };

    useEffect(() => {
        initUploadWidget();
    }, []);

    return (
        <div>
            {imageUrl && (
                <div>
                    <h3>Imagen de Perfil:</h3>
                    <img src={imageUrl} alt="Imagen de perfil" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                    <Button className="bg-primary-light text-tertiary-light hover:bg-white hover:text-primary-light w-[7.5rem] p-[0.7rem] mt-[1rem]" label="Cargar imagen" text raised rounded onClick={() => uploadWidget.open()} />
                </div>
            )}
        </div>
    );
}

export default UploadUserImage;