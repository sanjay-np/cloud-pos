
import { Button } from '@/Components/Ui/button'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon, SquarePlusIcon } from 'lucide-react'
import React from 'react'

export default function Index({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title='Purchases' />
            <div className="page-content purchases-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Purchase</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Purchase</span></li>
                        </ul>
                    </div>
                    <Button><SquarePlusIcon className="mr-2 size-5" /><span className='font-semibold'>Add Purchase</span></Button>
                </div>
            </div>
        </Authenticated>
    )
}
