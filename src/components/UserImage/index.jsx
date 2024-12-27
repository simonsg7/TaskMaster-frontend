import React from 'react';

const UserImage = () => {
    return (
        <div>
            <h2>Sube tu imagen de perfil</h2>
            <button onClick={() => uploadWidget.open()}>Cargar Imagen</button>
            {imageUrl && (
                <div>
                    <h3>Imagen de Perfil:</h3>
                    <img src={imageUrl} alt="Imagen de perfil" style={{ width: '200px', height: '200px', borderRadius: '50%' }} />
                </div>
            )}
        </div>
    );
};

export default UserImage;