
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import SearchBar from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import ProductForm from '@/Components/Forms/ProductForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import TableComp from '@/Components/Table/TableComp'
import { productTableHeader } from '@/Lib/Constants'
export default function Index({ auth, products, brands, suppliers }) {

    const [selected, setSelected] = useState(null);
    const [type, setType] = useState("add")
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        setType("edit");
        setSelected(id);
        drawerRef.current.open();
    };

    const deleteAction = (id) => {
        setSelected(id);
        deleteModalRef.current.open();
    };

    const handleDelete = () => {

    }

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
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Products'} />
                            </div>
                            <div className='add-product'>
                                <AddButton handleOnClick={() => {
                                    drawerRef.current.open()
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <TableComp
                            items={products}
                            checkboxCell={true}
                            columns={productTableHeader}
                            actions={{ editAction, deleteAction }}
                            pagination={true}
                        />
                    </div>
                </div>
            </div>
            <ProductForm
                drawerRef={drawerRef}
                type={type}
                brands={brands}
                suppliers={suppliers}
                selected={selected}
            />
            <DeleteModal
                ref={deleteModalRef}
                title={'Product'}
                deleteAction={handleDelete}
            />

        </Authenticated>
    )
}
