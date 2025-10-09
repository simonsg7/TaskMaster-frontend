import axios from "axios";
import { urlUpdateProject } from "../../../api/backendUrls";

const updateProject = async ({ projectId, data }) => {
    const token = localStorage.getItem('token');

    const res = await axios.put(urlUpdateProject(projectId), data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    return res.data;
};

export default updateProject;