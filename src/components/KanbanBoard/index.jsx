import React from 'react';
import Board from '@lourenci/react-kanban';
import '@lourenci/react-kanban/dist/styles.css';

const KanbanBoard = () => {
    const board = {
        columns: [
            {
                id: 1,
                title: 'To Do',
                cards: [
                    {
                        id: 1,
                        title: 'Task 1',
                        description: 'Description for Task 1'
                    },
                    {
                        id: 2,
                        title: 'Task 2',
                        description: 'Description for Task 2'
                    }
                ]
            },
            {
                id: 2,
                title: 'In Progress',
                cards: [
                    {
                        id: 3,
                        title: 'Task 3',
                        description: 'Description for Task 3'
                    }
                ]
            },
            {
                id: 3,
                title: 'Done',
                cards: [
                    {
                        id: 4,
                        title: 'Task 4',
                        description: 'Description for Task 4'
                    }
                ]
            }
        ]
    };

    return (
        <div>
            <h1>Kanban Board</h1>
            <Board initialBoard={board} />
        </div>
    );
};

export default KanbanBoard;