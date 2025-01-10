import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../../cloudinaryConfig';

const UserImage = () => {
    const defaultImage = cld.image('defaultImage');

    return (
        <div className="flex justify-center items-center p-[1.5rem]">
            <AdvancedImage cldImg={defaultImage} alt="Default Image" className="object-cover h-[32rem] w-[32rem] rounded-full" />
        </div>
    );
};

export default UserImage;