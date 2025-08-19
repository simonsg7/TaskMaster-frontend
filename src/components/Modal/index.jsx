import React, { useState } from 'react';
import Button1 from '../Button1';

const Modal = ({ title, children, buttonName }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    return (
        <>
            <Button1 label={`${ buttonName || 'Modal' }`} onClick={handleOpen} />

            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 pb-5 rounded-lg shadow-lg w-auto max-w-[45rem] relative flex flex-col items-center justify-center">
                        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

                        <button onClick={handleClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                            ✖
                        </button>

                        <div>
                            {typeof children === 'function' ? children({ close: handleClose }) : children}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;