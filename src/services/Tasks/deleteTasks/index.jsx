import axios from "axios";
import { urlDeleteTask } from "../../../api/backendUrls";

const deleteTask = async (taskId) => {
    try {
        const token = localStorage.getItem('token');

        await axios.delete(urlDeleteTask(taskId), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Task deleted");
        return true;
    } catch (error) {
        console.error("Error deleting task:", error.message);
        return false;
    }
};

export default deleteTask;