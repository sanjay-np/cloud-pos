import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React from 'react'

const Index = ({ auth }) => {

    return (
        <Authenticated user={auth.user}>
            <Head title="Point of Sale" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>POS</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>POS</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">

                </div>
            </div>
        </Authenticated>
    )
}

export default Index