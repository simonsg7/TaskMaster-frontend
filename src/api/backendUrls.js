const baseUrl = 'http://localhost:3000';

const userId = localStorage.getItem('userId');

export const urlLogin = `${baseUrl}/auth/login`;
export const urlGetAllUsers = `${baseUrl}/users/all`;
export const urlMyProfile = (userId) => `${baseUrl}/users/byid/${userId}`;
export const urlUpdateProfileImage = (userId) => `${baseUrl}/users/update-profile-image/${userId}`;
export const urlProjectsByUserId = (userId) => `${baseUrl}/projects/projectsbyuserid/${userId}`;
export const urlTaskById = (taskId) => `${baseUrl}/tasks/update/${taskId}`;