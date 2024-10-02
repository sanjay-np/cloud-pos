
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import SearchComp from '@/Components/Search/Index'
export default function Index({ auth }) {

    const [open, setOpen] = useState(false)

    return (
        <Authenticated user={auth.user} activeKey={['products']}>
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
                </div>
                <div className="content-wrapper h-[500px] bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchComp title={'Products'}/>
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
                </div>
            </div>
        </Authenticated>
    )
}
