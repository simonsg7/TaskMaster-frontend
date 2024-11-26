import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';

const AdminLayout = () => {
    return (
        <div className='admin-content'>
            <div className='sidebar border border-purple-900'>
                <Sidebar />,
            </div>
            <div className='header'>
                <Header />,
            </div>
        </div>
    );
}

export default AdminLayout;