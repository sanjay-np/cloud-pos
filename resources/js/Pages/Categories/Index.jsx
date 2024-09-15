import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';

export default function Index({ auth }) {
    return (
        <Authenticated user={auth.user} activeKey={['products']}>
            <Head title="Categories" />
            <div className="page-content categories-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Categories</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Categories</span></li>
                        </ul>
                    </div>
                    <div className='add-product'>
                        <ButtonToolbar>
                            <IconButton
                                size='lg'
                                color='green'
                                icon={<AddOutlineIcon />}
                                appearance='primary'
                                onClick={() => setOpen(true)}
                            >
                                <span className='font-semibold'>Add New</span>
                            </IconButton>
                        </ButtonToolbar>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
