import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import UserImage from '../UserImage';
import handleDragEnd from '../../middlewares/DragAndDrop';
import Modal from '../Modal';
import FormCreateTask from '../FormCreateTask';
import { getCardsData } from '../../utils/getCardsData';
import deleteTask from '../../services/Tasks/deleteTasks';
import { useMutation, useQueryClient } from 'react-query';
import FormUpdateTask from '../FormUpdateTask';
import Button1 from '../Button1';

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

const mapItemsToBoard = (items, title = '') => {
    const columns = [
        { id: 'todo', title: 'To Do', cards: [] },
        { id: 'doing', title: 'Doing', cards: [] },
        { id: 'done', title: 'Done', cards: [] }
    ];

    const cards = getCardsData(items);
    cards.forEach(item => {
        let columnId;
        switch ((item.state || '').toLowerCase()) {
            case 'pendiente':
                columnId = 'todo';
                break;
            case 'en progreso':
                columnId = 'doing';
                break;
            case 'completa':
                columnId = 'done';
                break;
            default:
                columnId = null;
        }
        if (columnId) {
            const column = columns.find(col => col.id === columnId);
            if (column) {
                column.cards.push(item);
            }
        }
    });

    return { title, columns };
};

const KanbanBoard = ({ selectedProject, projects }) => {
    const [board, setBoard] = useState({ title: '', columns: [] });
    const [selectedTask, setSelectedTask] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    useEffect(() => {
        console.log('Projects in KanbanBoard:', projects);
        console.log('Selected project:', selectedProject);
        
        if (selectedProject) {
            console.log('Selected project tasks:', selectedProject.tasks);
            setBoard(mapItemsToBoard(selectedProject.tasks, selectedProject.name));
        } else if (projects) {
            console.log('Mapping projects to board:', projects);
            setBoard(mapItemsToBoard(projects, 'My Projects'));
        }
    }, [projects, selectedProject]);

    const queryClient = useQueryClient();
    const { mutate: deleteTaskMutate } = useMutation(deleteTask, { onSuccess: () => queryClient.invalidateQueries('projectsAndTasks') })

    const openUpdateModal = (task) => {
        setSelectedTask(task);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className='h-full w-full p-4 overflow-auto'>
            <h1 className="text-center text-2xl mt-2">{board.title}</h1>

            <Button1 label="Add Task" onClick={() => setIsCreateModalOpen(true)} />
                <Modal title="Add Task" isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                    {
                        ({ close }) => (
                            <FormCreateTask selectedProject={selectedProject} close={close} />
                        )
                    }
                </Modal>

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
                                                                <div {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps} className={`h-auto w-[15rem] flex flex-col bg-white mb-2 p-2 border-[0.14rem] ${getBorderClassByPriority(card.priority)} rounded-lg shadow-md duration-200 hover:scale-105`}>
                                                                    <div className='flex justify-between'>
                                                                        <p className='font-bold'>{card.title}</p>
                                                                        <UserImage className='h-[2rem] w-[2rem] mb-[0.4rem]' />
                                                                    </div>
                                                                    <hr />
                                                                    <p>{card.user}</p>
                                                                    <p>{card.description}</p>
                                                                    <hr />
                                                                    <div className='flex justify-between'>
                                                                        <p>{card.category}</p>
                                                                        <button title='Edit Card' onClick={() => openUpdateModal(card)} className='pi pi-pencil text-[1rem] opacity-40'></button>
                                                                    </div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className='border border-gray-400 w-[50%] p-1 mt-[0.5rem]'><p>{card.expectation_date.split('T')[0]}</p></div>
                                                                        <button title='Delete Card' onClick={() => deleteTaskMutate(card.id)} className='pi pi-trash text-[1.1rem] pt-5 opacity-40'></button>
                                                                    </div>
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

            <Modal title="Update Task" isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                {
                    ({ close }) => (
                        <FormUpdateTask selectedProject={selectedProject} close={close} task={selectedTask} />
                    )
                }
            </Modal>
        </div>
    );
};

export default KanbanBoard;