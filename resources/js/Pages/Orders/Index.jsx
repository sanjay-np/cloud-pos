
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon, SquarePlusIcon } from 'lucide-react'
import React from 'react'

export default function Index({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title='Purchases' />
            <div className="page-content orders-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Orders</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Orders</span></li>
                        </ul>
                    </div>                    
                </div>
            </div>
        </Authenticated>
    )
}
