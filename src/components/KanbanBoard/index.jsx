import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { urlProjectsByUserId } from '../../api/backendUrls';
import UserImage from '../UserImage';
import handleDragEnd from '../../middlewares/DragAndDrop';
import Modal from '../Modal';
import FormCreateTask from '../FormCreateTask';

const getBorderClassByPriority = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'baja':
            return 'border-green-500';
        case 'media':
            return 'border-yellow-500';
        case 'alta':
            return 'border-red-500';
    }
};

const KanbanBoard = () => {
    const [board, setBoard] = useState({ title: '', columns: [] });

    useEffect(() => {
        const fetchProjectsAndTasks = async () => {
            try {
                const token = localStorage.getItem('token');
                const userId = localStorage.getItem('userId');
                
                const response = await axios.get(urlProjectsByUserId(userId), {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                
                if (response.status === 200) {
                    console.log('Response', response);
                    const userDetails = response.data[0];

                    if (userDetails && userDetails.projects) {
                        const project = userDetails.projects[1]; // Assuming we are using the first project
                        const columns = [
                            { id: 'todo', title: 'To Do', cards: [] },
                            { id: 'doing', title: 'Doing', cards: [] },
                            { id: 'done', title: 'Done', cards: [] }
                        ];

                        project.tasks.forEach(task => {
                            if (task.state) {
                                let columnId;
                                switch (task.state.toLowerCase()) {
                                    case 'pendiente':
                                        columnId = 'todo';
                                        break;
                                    case 'en progreso':
                                        columnId = 'doing';
                                        break;
                                    case 'completa':
                                        columnId = 'done';
                                        break;
                                    // case 'diario':
                                    //     // Handle 'diario' tasks later
                                    //     break;
                                    default:
                                        columnId = null;
                                }

                                if (columnId) {
                                    const column = columns.find(col => col.id === columnId);
                                    if (column) {
                                        column.cards.push({
                                            id: task.id,
                                            title: task.name,
                                            description: task.description,
                                            category: task.category,
                                            priority: task.priority,
                                            expectation_date: task.expectation_date,
                                            user: [task.users_detail.first_name, ' ', task.users_detail.last_name]
                                        });
                                    }
                                }
                            }
                        });

                        setBoard({ title: project.name, columns });

                    } else {
                        console.error('Projects data is missing or malformed');
                        alert('Error al obtener proyectos y tareas');
                    }
                } else {
                    alert('Error al obtener proyectos y tareas');
                }
            } catch (error) {
                console.error("Error", error.message);
                alert('Error al obtener proyectos y tareas');
            }
        };

        fetchProjectsAndTasks();
    }, []);


    return (
        <div className='h-full w-full p-4 overflow-auto'>
            <h1 className="text-center text-2xl mt-2">{board.title}</h1>

            <DragDropContext onDragEnd={(result) => { handleDragEnd(result, setBoard) }}>
                <div  className="flex justify-center mt-2">
                    {
                        board.columns.map(column => (
                            <Droppable key={column.id} droppableId={column.id}>
                                {
                                    (droppableProvided) => (
                                        <div {...droppableProvided.droppableProps} ref={droppableProvided.innerRef} className="w-[17rem] min-h-[45.5rem] border border-gray-300 rounded-lg bg-tertiary-light m-2 flex flex-col items-center">
                                            <h2 className='text-[1.2rem] font-bold m-2'>{column.title}</h2>

                                            {
                                                column.cards.map((card, index) => (
                                                    <Draggable key={card.id} draggableId={card.id} index={index}>
                                                        {
                                                            (draggableProvided) => (
                                                                <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className={`h-auto w-[15rem] flex flex-col bg-white mb-2 p-2 border ${getBorderClassByPriority(card.priority)} rounded-lg shadow-md duration-200 hover:scale-105`}>
                                                                    <div className='flex justify-between'>
                                                                        <p className='font-bold'>{card.title}</p>
                                                                        <UserImage className='h-[2rem] w-[2rem] mb-[0.4rem]' />
                                                                    </div>
                                                                    <hr />
                                                                    <p>{card.user}</p>
                                                                    <p>{card.description}</p>
                                                                    <hr />
                                                                    <p>{card.category}</p>
                                                                    {/* <p>{card.priority}</p> */}
                                                                    <div className='border border-gray-400 w-[50%] p-1'><p>{card.expectation_date.split('T')[0]}</p></div>
                                                                </div>
                                                            )
                                                        }
                                                    </Draggable>
                                                ))
                                            }
                                            {/* {droppableProvided.placeholder} */}
                                        </div> 
                                    )
                                }
                            </Droppable>
                        ))
                    }
                </div>
            </DragDropContext>


            <Modal title="Add Task" buttonName="Add Task">
                <FormCreateTask />
            </Modal>
        </div>
    );
};

export default KanbanBoard;