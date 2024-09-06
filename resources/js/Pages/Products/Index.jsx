
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React from 'react'
import AddProduct from '@/Components/Products/AddProduct'

export default function Index({ auth }) {
    return (
        <Authenticated user={auth.user}>
            <Head title='Products' />
            <div className="page-content products-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Products</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                        </ul>
                    </div>
                    <div>
                        <AddProduct />
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
