import axios from 'axios';
import { urlCreateProject } from '../../../api/backendUrls';

const createProject = async (data) => {
    const token = localStorage.getItem('token');
    const userDetailId = localStorage.getItem('userDetailId');

    const payload = {
        ...data,
        user_detail_id: userDetailId,
    };

    const response = await axios.post(urlCreateProject, payload, {
        headers: { Authorization: `Bearer ${token}` }
    });

    return response.data;
};

export default createProject;