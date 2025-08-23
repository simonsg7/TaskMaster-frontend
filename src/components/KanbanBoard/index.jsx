import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useQuery } from 'react-query';

import UserImage from '../UserImage';
import handleDragEnd from '../../middlewares/DragAndDrop';
import Modal from '../Modal';
import FormCreateTask from '../FormCreateTask';
import getProjectsAndTasks from '../../services/GetProjectsAndTasks';
import { getCardsData } from '../../utils/getCardsData';

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
    // const { data, isLoading, error } = useQuery({
    //     queryKey: ['projectsAndTasks'],
    //     queryFn: getProjectsAndTasks
    // });

    const [board, setBoard] = useState({ title: '', columns: [] });

    useEffect(() => {
        // if (isLoading || error) return;
        
    //     if (selectedProject) {
    //         setBoard(mapItemsToBoard(selectedProject.tasks, selectedProject.name));
    //     } else if (data && data[0]?.projects) {
    //         setBoard(mapItemsToBoard(data[0].projects, 'My Projects'));
    //     }
    // }, [data, selectedProject, isLoading, error]);    
    
        // if (isLoading) return <div>Loading...</div>;
        // if (error) return <div>Error loading projects and tasks</div>;

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
                                                                    <div className='border border-gray-400 w-[50%] p-1 mt-[0.5rem]'><p>{card.expectation_date.split('T')[0]}</p></div>
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
                {
                    ({ close }) => (
                        <FormCreateTask selectedProject={selectedProject} close={close} />
                    )
                }
            </Modal>
        </div>
    );
};

export default KanbanBoard;