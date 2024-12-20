const baseUrl = 'http://localHost:3000';

const userId = localStorage.getItem('userId');

export const urlLogin = `${baseUrl}/auth/login`;
export const urlGetAllUsers = `${baseUrl}/users/all`;
export const urlMyProfile = (userId) => `${baseUrl}/users/byid/${userId}`;