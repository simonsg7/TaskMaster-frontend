import axios from 'axios';
import { urlProjectsByUserId } from '../../../api/backendUrls';

const getProjectsAndTasks = async (userId) => {
    if (!userId) {
        return Promise.resolve([]);
    }
    const token = localStorage.getItem('token');

    const response = await axios.get(urlProjectsByUserId(userId), {
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Projects and Tasks fetched:', response.data);

    return response.data;
}

export default getProjectsAndTasks;