import axios from 'axios';
import { urlTaskById } from '../../api/backendUrls';

const updateTaskState = async (taskId, newState) => {
    try {
        const token = localStorage.getItem('token');
        console.log(`Updating task ${taskId} state to ${newState}`);

        await axios.put(urlTaskById(taskId), { state: newState }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error("Error updating task state:", error.message);
    }
};

const handleDragEnd = (result, setBoard) => {
    const { source, destination } = result;
    if (!destination) {
        return;
    }
    if (source.index === destination.index && source.droppableId === destination.droppableId) {
        return;
    }

    setBoard((prevBoard) => {
        const sourceColumn = prevBoard.columns.find(column => column.id === source.droppableId);
        const destinationColumn = prevBoard.columns.find(column => column.id === destination.droppableId);
        const [movedTask] = sourceColumn.cards.splice(source.index, 1);

        let newState;
        switch (destinationColumn.id) {
            case 'todo':
                newState = 'pendiente';
                break;
            case 'doing':
                newState = 'en progreso';
                break;
            case 'done':
                newState = 'completa';
                break;
            default:
                newState = movedTask.state;
                break;
        }
        movedTask.state = newState;

        destinationColumn.cards.splice(destination.index, 0, movedTask);

        updateTaskState(movedTask.id, newState);

        return {
            ...prevBoard,
            columns: prevBoard.columns.map(column => {
                if (column.id === source.droppableId) {
                    return sourceColumn;
                } else if (column.id === destination.droppableId) {
                    return destinationColumn;
                } else {
                    return column;
                }
            })
        };
    });
}

export default handleDragEnd;