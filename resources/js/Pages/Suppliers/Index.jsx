import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SupplierDrawer from '@/Components/Suppliers/SupplierDrawer'
import SupplierTable from '@/Components/Suppliers/SupplierTable'

export default function Index({ auth, brands, suppliers }) {

    const [selected, setSelected] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [title, setTitle] = useState('Add')
    const [alertState, setAlertState] = useState(false)


    return (
        <Authenticated user={auth.user}>
            <Head title="Suppliers" />
            <div className="page-content suppliers-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Suppliers</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Suppliers</span></li>
                        </ul>
                    </div>
                    <div className='add-product'>
                        <ButtonToolbar>
                            <IconButton
                                size='lg'
                                color='green'
                                icon={<AddOutlineIcon />}
                                appearance='primary'
                                onClick={() => setDrawerState(true)}
                            >
                                <span className='font-semibold'>Add New</span>
                            </IconButton>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="content-wrapper h-[500px] bg-white">
                    <SupplierTable
                        data={suppliers?.data}
                        setTitle={setTitle}
                        setSelected={setSelected}
                        setDrawerState={setDrawerState}
                        setAlertState={setAlertState}
                    />
                </div>
            </div>
            <SupplierDrawer
                selected={selected}
                setSelected={setSelected}
                title={title}
                open={drawerState}
                setOpen={setDrawerState}
                brands={brands}
            />
        </Authenticated>
    )
}
