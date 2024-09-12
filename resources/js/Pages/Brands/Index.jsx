import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import BrandrDrawer from '@/Components/Brands/BrandDrawer'

export default function Index({ auth }) {

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('Add')

    return (
        <Authenticated user={auth.user}>
            <Head title="Brands" />
            <div className="page-content brands-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Brands</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Brands</span></li>
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
            <BrandrDrawer
                open={open}
                title={title}
                setOpen={setOpen}
            />
        </Authenticated>
    )
}
