import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import CategoryDrawer from '@/Components/Categories/CategoryDrawer'
import SearchComp from '@/Components/Search/Index'
import CategoryTable from '@/Components/Categories/CategoryTable'
import CategoryAlert from '@/Components/Categories/CategoryAlert'

export default function Index({ auth, categories }) {

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
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchComp />
                            </div>
                            <div className="add-category">
                                <ButtonToolbar>
                                    <IconButton size='lg' color='green' icon={<AddOutlineIcon />} appearance='primary' onClick={handleAddState}>
                                        <span className='font-semibold'>Add New</span>
                                    </IconButton>
                                </ButtonToolbar>
                            </div>
                        </div>
                    </div>
                    <CategoryTable
                        data={categories?.data}
                        setTitle={setTitle}
                        setSelected={setSelected}
                        setDrawerState={setDrawerState}
                        setAlertState={setAlertState}
                    />
                </div>
            </div>
            <CategoryDrawer
                selected={selected}
                setSelected={setSelected}
                title={title}
                open={drawerState}
                setOpen={setDrawerState}
            />
            <CategoryAlert
                open={alertState}
                setOpen={setAlertState}
                selected={selected}
                setSelected={setSelected}
            />
        </Authenticated>
    )
}
