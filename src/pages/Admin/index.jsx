import React from 'react';
import { Outlet } from 'react-router-dom';
import './AdminLayout.scss';
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const AdminLayout = () => {
    return (
        <div className='admin-content h-screen w-screen flex'>
            <div className='sidebar left-0'>
                <Sidebar />
            </div>
            <div className='main-content right-0 flex flex-col items-center flex-grow'>
                <div className='header'>
                    <Header />
                </div>
                <div className='w-[100%] flex flex-col flex-grow justify-center items-center'>
                    <div className='w-[100%] flex flex-col flex-grow justify-center items-center overflow-auto'>
                        <Outlet />
                    </div>
                    <div className='footer h-[2rem] w-[100%] flex justify-center'>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminLayout;