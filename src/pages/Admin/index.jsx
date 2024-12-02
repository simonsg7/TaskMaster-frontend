import React from 'react';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
    return (
        <div className='admin-content flex'>
            <div className='sidebar'>
                <Sidebar />,
            </div>
            <div className='main-content'>
                <div className='header'>
                    <Header />,
                </div>
                    <Outlet />
                <div className='footer'>
                    <Footer />
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;