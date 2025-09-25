import axios from "axios";
import { urlUpdateTask } from "../../../api/backendUrls";

const updateTask = async (taskId) => {
    const token = localStorage.getItem('token');

    const res = await axios.put(urlUpdateTask(taskId), data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    console.log("Task updated");
    return res.data;
};

export default updateTask;

// export default async function updateTask(taskId, data) {
//     const token = localStorage.getItem('token');
//     const res = await axios.put( urlUpdateTask(taskId), data, {
//         headers: {
//             Authorization: `Bearer ${token}`
//         }
//     });
//     return res.data;
// }