
import PrimaryButton from '@/Components/Theme/Button/PrimaryButton'
import Sheet from '@/Components/Theme/Sheet/Sheet'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, CirclePlusIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function Index({ auth }) {
    const [showSheet, setShowSheet] = useState(false)
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
                    <PrimaryButton className="flex items-center gap-1" onClick={() => setShowSheet(true)}>
                        <CirclePlusIcon size={20} />
                        <span>New</span>
                    </PrimaryButton>
                </div>
                <Sheet
                    open={showSheet}
                    onClose={() => setShowSheet(false)}
                    direction='right'
                    size={400}
                >
                    <Sheet.Title className="p-3 text-lg font-semibold border-b text-gray-600 border-gray-100">Add New Product</Sheet.Title>
                    <Sheet.Content className="p-3">Sheet Content</Sheet.Content>
                </Sheet>
            </div>
        </Authenticated>
    )
}
