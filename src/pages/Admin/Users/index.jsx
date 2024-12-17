import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';
import PropTypes from 'prop-types';

import { urlGetAllUsers } from '../../../api/backendUrls';
import { handleApiErrors } from '../../../api/handleApiErrors';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const userEmail = localStorage.getItem('userEmail');
                
                const response = await axios.get(urlGetAllUsers, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.ok) {
                    const usersWithoutUserEmail = response.data.response.filter(user => user.email !== userEmail);
                    setUsers(usersWithoutUserEmail);
                } else {
                    alert('Error al obtener usuarios');
                }

            } catch (error) {
                const errorResponse = handleApiErrors(error);
                console.error("Error", errorResponse.message);
                alert(errorResponse.message);
                
            // } finally {
            //     setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    const userName = (user) => {
        return `${user.users_detail.first_name} ${user.users_detail.last_name}`;
    };

    return (
        <div className='bg-white h-[100%] w-[100%] -z-[5] p-[2.5rem]'>
            <div className='flex flex-col justify-start items-center w-[100%] px-[10px] pb-[4rem] bg-tertiary-light rounded-[1rem]'>
                <div className='w-[100%]'>
                    <h2 className='text-[4rem]'>Users</h2>
                </div>
                <div className='bg-white w-[100%] h-[100%] flex justify-center items-center mt-[4rem] py-[1.5rem] rounded-[1rem]'>
                    <DataTable value={ users } stripedRows tableStyle={{ minWidth: '30rem', minHeight: '20rem' }} className='w-[90%]'>
                        <Column 
                            header="Name" 
                            body={ (rowData) => userName(rowData) }
                            headerStyle={{ padding: '0.7rem' }}
                        ></Column>
                        <Column 
                            header="Email" 
                            field="email"
                            headerStyle={{ padding: '0.7rem' }}
                        ></Column>
                    </DataTable>
                </div>
            </div>
        </div>
    );
}

GetAllUsers.propTypes = {
    users: PropTypes.arrayOf(
        PropTypes.shape({
            users_detail: PropTypes.array
        })
    )
};

export default GetAllUsers;