import { useState, useEffect } from 'react';
import axios from 'axios';

import { urlMyProfile } from '../../api/backendUrls';
import { handleApiErrors } from '../../api/handleApiErrors';
import UploadUserImage from '../../components/UploaduserImage';

const UserProfile = () => {    
    const [userProfile, setUserProfile] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                const urlProfile = urlMyProfile(userId);
                
                const response = await axios.get(urlProfile, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });                

                if (response.status === 200) {
                    setUserProfile(response.data.response);
                } else {
                    alert('Error al obtener usuario');
                }

            } catch (error) {
                const errorResponse = handleApiErrors(error);
                console.error("Error", errorResponse.message);
                alert(errorResponse.message);
                
            // } finally {
            //     setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    return (
        <div>
            <UploadUserImage />
            <h2>My Profile!</h2>
            {userProfile ? (
                <div>
                    <p><strong>Name:</strong> {userProfile.users_detail.first_name} {userProfile.users_detail.last_name}</p>
                    <p><strong>Email:</strong> {userProfile.email}</p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
    );
}

export default UserProfile;