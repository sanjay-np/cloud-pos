import React, { useState } from 'react';
import Sidebar from '@/Components/Theme/Sidebar';
import Header from '@/Components/Theme/Header';

export default function Authenticated({ user, header, children }) {
    return (
        <React.Fragment>
            <div className="main-layout">
                <aside className='sidebar'>
                    <Sidebar />
                </aside>
                <div className="main-content">
                    <Header />
                    <main>{children}</main>
                </div>
            </div>
        </React.Fragment>
    );
}
