import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import UserImage from '../UserImage';
import handleDragEnd from '../../middlewares/DragAndDrop';
import Modal from '../Modal';
import { getCardsData } from '../../utils/getCardsData';
import deleteTask from '../../services/Tasks/deleteTasks';
import deleteProject from '../../services/Projects/deleteProjects';
import { useMutation, useQueryClient } from 'react-query';
import FormCreateTask from '../FormCreateTask';
import FormCreateProject from '../FormCreateProject';
import FormUpdateTask from '../FormUpdateTask';
import FormUpdateProject from '../FormUpdateProject';
import Button1 from '../Button1';

const getBorderClassByPriority = (priority) => {
    switch (priority?.toLowerCase()) {
        case 'baja':
            return 'border-green-400';
        case 'media':
            return 'border-yellow-300';
        case 'alta':
            return 'border-red-400';
    }
};

const mapItemsToBoard = (items, title = '', type = 'task') => {
    const columns = [
        { id: 'todo', title: 'To Do', cards: [] },
        { id: 'doing', title: 'Doing', cards: [] },
        { id: 'done', title: 'Done', cards: [] }
    ];

    const cards = getCardsData(items, type);
    cards.forEach(item => {
        let columnId;
        switch ((item.state || '').toLowerCase()) {
            case 'pendiente':
                columnId = 'todo';
                break;
            case 'en progreso':
                columnId = 'doing';
                break;
            case 'completo':
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
    console.log('KanbanBoard received props:', { selectedProject, projects });

    const [board, setBoard] = useState({ title: '', columns: [] });
    const [selectedCard, setSelectedCard] = useState(null);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const isProjectView = !selectedProject;

    useEffect(() => {
        console.log('Projects in KanbanBoard:', projects);
        console.log('Selected project:', selectedProject);
        
        if (selectedProject) {
            console.log('Selected project tasks:', selectedProject.tasks);
            setBoard(mapItemsToBoard(selectedProject.tasks, selectedProject.name, 'task'));
        } else if (projects) {
            console.log('Mapping projects to board:', projects);
            setBoard(mapItemsToBoard(projects, 'My Projects', 'project'));
        }
    }, [projects, selectedProject]);

    const queryClient = useQueryClient();
    const { mutate: deleteTaskMutate } = useMutation(deleteTask, {
        onSuccess: () => queryClient.invalidateQueries('projectsAndTasks')
    });

    const { mutate: deleteProjectMutate } = useMutation(deleteProject, {
        onSuccess: () => queryClient.invalidateQueries('projectsAndTasks')
    });

    const openUpdateModal = (card) => {
        setSelectedCard(card);
        setIsUpdateModalOpen(true);
    };

    return (
        <div className='h-full w-full flex flex-col items-center p-4 overflow-auto'>
            <div className='flex items-center justify-between h-[4rem] w-[53rem]'>
                <h1 className="text-center text-[2.5rem] mt-2">{board.title}</h1>
                <Button1 label={isProjectView ? "Add Project" : "Add Task"} onClick={() => setIsCreateModalOpen(true)} className={"mr-2 mt-[0.5rem]"} />
            </div>

            <DragDropContext onDragEnd={(result) => { handleDragEnd(result, setBoard, selectedProject ? 'task' : 'project') }}>
                <div  className="flex justify-center">
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
                                                                    <p>{card.description}</p>
                                                                    <hr />
                                                                    <p>{isProjectView ? card.users : card.user}</p>
                                                                    <div className='flex justify-between'>
                                                                        <p>{card.category}</p>
                                                                        <button title='Edit Card' onClick={() => openUpdateModal(card)} className='pi pi-pencil text-[1rem] opacity-40'></button>
                                                                    </div>
                                                                    <div className='flex justify-between items-center'>
                                                                        <div className='border border-gray-400 w-[50%] p-1 mt-[0.5rem]'><p>{card.expectation_date.split('T')[0]}</p></div>
                                                                        <button title='Delete Card' onClick={() => {isProjectView ? deleteProjectMutate(card.id) : deleteTaskMutate(card.id)}} className='pi pi-trash text-[1.1rem] pt-5 opacity-40'></button>
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

            <Modal title={isProjectView ? "Add Project" : "Add Task"} isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)}>
                {
                    ({ close }) => {
                        if (isProjectView) {
                            return <FormCreateProject close={close} />;
                        } else {
                            return <FormCreateTask selectedProject={selectedProject} close={close} />;  
                        }
                    }
                }
            </Modal>

            <Modal title={isProjectView ? "Update Project" : "Update Task"} isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
                {
                    ({ close }) => {
                        if (isProjectView) {
                            return <FormUpdateProject project={selectedCard} close={close} />;
                        } else {
                            return <FormUpdateTask selectedProject={selectedProject} close={close} task={selectedCard} />;
                        }
                    }
                }
            </Modal>
        </div>
    );
};

export default KanbanBoard;