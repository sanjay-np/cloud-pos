
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import SearchComp from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import ProductForm from '@/Components/Forms/ProductForm'
export default function Index({ auth }) {

    const drawerRef = useRef(false)
    const alertModalRef = useRef(false)
    const [type, setType] = useState("add")

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
                                <SearchComp title={'Products'} />
                            </div>
                            <div className='add-product'>
                                <AddButton handleOnClick={() => {
                                    drawerRef.current.open()
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
                <ProductForm
                    drawerRef={drawerRef}
                    type={type}
                />
            </div>
        </Authenticated>
    )
}
