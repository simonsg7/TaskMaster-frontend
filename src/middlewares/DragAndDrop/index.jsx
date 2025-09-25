import axios from 'axios';
import { urlUpdateTask, urlUpdateProject } from '../../api/backendUrls';

const updateTaskState = async (itemId, newState, type) => {
    try {
        const token = localStorage.getItem('token');
        console.log(`Updating ${type} ${itemId} state to ${newState}`);

        const url = type === 'task' ? urlUpdateTask(itemId) : urlUpdateProject(itemId);
        await axios.put(url, { state: newState }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error(`Error updating ${type} state:`, error.message);
    }
};

const handleDragEnd = (result, setBoard, type = 'task') => {
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
        const [movedItem] = sourceColumn.cards.splice(source.index, 1);

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
                newState = movedItem.state;
                break;
        }
        movedItem.state = newState;

        destinationColumn.cards.splice(destination.index, 0, movedItem);

        updateTaskState(movedItem.id, newState);

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