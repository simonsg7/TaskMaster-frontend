import axios from "axios";
import { urlDeleteProject } from "../../../api/backendUrls";

const deleteProject = async (projectId) => {
    try {
        const token = localStorage.getItem('token');
        await axios.delete(urlDeleteProject(projectId), {
            headers: { Authorization: `Bearer ${token}` }
        });
        return true;
    } catch (error) {
        console.error("Error deleting project:", error.message);
        return false;
    }
};

export default deleteProject;