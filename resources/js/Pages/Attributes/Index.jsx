import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SearchComp from '@/Components/Search/Index'
import AttributeDrawer from '@/Components/Attributes/AttributeDrawer'

export default function Index({ auth }) {

    const [selected, setSelected] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [title, setTitle] = useState('Add')
    const [alertState, setAlertState] = useState(false)

    const handleAddState = () => {
        setTitle('Add')
        setDrawerState(true)
    }

    return (
        <Authenticated user={auth.user} activeKey={['products']}>
            <Head title="Attributes" />
            <div className="page-content attributes-page">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Attributes</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Attributes</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper h-[500px] bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchComp />
                            </div>
                            <div className='add-product'>
                                <ButtonToolbar>
                                    <IconButton
                                        size='lg'
                                        color='green'
                                        icon={<AddOutlineIcon />}
                                        appearance='primary'
                                        onClick={handleAddState}
                                    >
                                        <span className='font-semibold'>Add New</span>
                                    </IconButton>
                                </ButtonToolbar>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AttributeDrawer
                selected={selected}
                setSelected={setSelected}
                title={title}
                open={drawerState}
                setOpen={setDrawerState}
            />
        </Authenticated>
    )
}
