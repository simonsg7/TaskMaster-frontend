import { useState, useEffect } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';

import { urlMyProfile } from '../../api/backendUrls';
import { handleApiErrors } from '../../api/handleApiErrors';
import UserImage from '../../components/UserImage';
import KanbanBoard from '../../components/KanbanBoard';
import Modal from '../../components/Modal';
import getProjectsAndTasks from '../../services/Projects/GetProjectsAndTasks';
import Button1 from '../../components/Button1';

const UserProfile = () => {    
    const [userProfile, setUserProfile] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);

    const { data } = useQuery('projectsAndTasks', getProjectsAndTasks);

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
            }
        };

        fetchUserProfile();
    }, []);

    const projects = data ? (Array.isArray(data) ? data[0]?.projects : data.projects) : [];

    useEffect(() => {
        if (selectedProject && projects.length > 0) {
            const updated = projects.find(p => p.id === selectedProject.id);
            if (updated) setSelectedProject(updated);
        }
    }, [projects]);

    return (
        <div className='flex w-full h-full pt-2'>
            <div className='border border-red-600 px-2 flex flex-col'>
                <div className='mb-2'>
                    <UserImage className="h-[13rem] w-[13rem]" />
                </div>
                <div className='border border-purple-600 flex flex-1 flex-col items-center justify-center'>
                    <h2>My Profile!</h2>
                    <Button1 label="Select Project" onClick={() => setModalOpen(true)} />
                        <Modal title="Select Project" isOpen={modalOpen} onClose={() => setModalOpen(false)}>
                            {({ close }) => (
                                <div className="flex flex-col">
                                    <Button1 label="My Projects" className="mt-[1rem] mx-[1rem] mb-[0.3rem]"
                                        onClick={() => {
                                            setSelectedProject(null);
                                            close();
                                        }}
                                    />
                                    {projects && projects.map(project => (
                                        <Button1 label={project.name} className='mt-[1rem] mx-[1rem] mb-[0.3rem]' key={project.id}
                                            onClick={() => {
                                                setSelectedProject(project);
                                                console.log('Selected project:', project);
                                                close();
                                            }}
                                        />
                                    ))}
                                </div>
                            )}
                        </Modal>
                    {userProfile ? (
                        <div>
                            <p><strong>Name:</strong> {userProfile.users_detail.first_name} {userProfile.users_detail.last_name}</p>
                            <p><strong>Email:</strong> {userProfile.email}</p>
                        </div>
                    ) : (
                        <p>No profile data available.</p>
                    )}
                </div>
            </div>
            <div className='border border-blue-500 pl-2 flex-1'>
                <KanbanBoard selectedProject={selectedProject} projects={projects} />
            </div>
            {/* <UpdateUserImage /> */}
        </div>
    );
}

export default UserProfile;