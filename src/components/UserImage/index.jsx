import React from 'react';
import { AdvancedImage } from '@cloudinary/react';
import cld from '../../../cloudinaryConfig';

const UserImage = ({ className }) => {
    const imageUrl = localStorage.getItem('imageUrl');

    if (imageUrl) {
        return (
            <div>
                <AdvancedImage
                    cldImg={cld.image(imageUrl)}
                    alt="User Profile"
                    className={`${className} object-cover rounded-full m-[1.5rem]`}
                />
            </div>
        );
    } else {
        return (
            <div>
                <AdvancedImage
                    cldImg={cld.image('defaultImage')}
                    alt="Default Image"
                    className={`${className} object-cover rounded-full m-[1.5rem]`}
                />
            </div>
        );
    }
};

export default UserImage;