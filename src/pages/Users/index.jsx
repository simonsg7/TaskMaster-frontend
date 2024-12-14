import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import axios from 'axios';

import { urlGetAllUsers } from '../../api/backendUrls';
import { handleApiErrors } from '../../api/handleApiErrors';

const GetAllUsers = () => {
    const [users, setUsers] = useState([]);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('Token');
                
                const response = await axios.get(urlGetAllUsers, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data.ok) {
                    setUsers(response.data.response);
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
        <div className='flex flex-col items-center'>            
                <DataTable value={ users } stripedRows tableStyle={{ minWidth: '30rem', minHeight: '20rem' }}>
                    <Column 
                        header="Name" 
                        body={(rowData) => userName(rowData)}
                        headerStyle={{ padding: '0.7rem' }}
                        ></Column>
                    <Column 
                        header="Email" 
                        field="email"
                        headerStyle={{ padding: '0.7rem' }}
                    ></Column>
            </DataTable>
        </div>
    );
}

export default GetAllUsers;