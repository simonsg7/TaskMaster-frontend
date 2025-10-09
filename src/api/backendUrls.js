const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const userId = localStorage.getItem('userId');

export const urlLogin = `${baseUrl}/auth/login`;
export const urlGetAllUsers = `${baseUrl}/users/all`;
export const urlMyProfile = (userId) => `${baseUrl}/users/byid/${userId}`;
export const urlUpdateProfileImage = (userId) => `${baseUrl}/users/update-profile-image/${userId}`;
export const urlProjectsByUserId = (userId) => `${baseUrl}/projects/projectsbyuserid/${userId}`;
export const urlCreateTask = `${baseUrl}/tasks/create`;
export const urlDeleteTask = (taskId) => `${baseUrl}/tasks/delete/${taskId}`;
export const urlUpdateTask = (taskId) => `${baseUrl}/tasks/update/${taskId}`;
export const urlUpdateProject = (projectId) => `${baseUrl}/projects/update/${projectId}`;
export const urlCreateProject = `${baseUrl}/projects/create`;