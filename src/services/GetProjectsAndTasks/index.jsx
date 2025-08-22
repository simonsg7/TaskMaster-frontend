import axios from 'axios';
import { urlProjectsByUserId } from '../../api/backendUrls';

const getProjectsAndTasks = async () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    const response = await axios.get(urlProjectsByUserId(userId), {
        headers: { Authorization: `Bearer ${token}` }
    });

    console.log('Projects and Tasks fetched:', response.data[0].projects);
    

    return response.data;
}

export default getProjectsAndTasks;