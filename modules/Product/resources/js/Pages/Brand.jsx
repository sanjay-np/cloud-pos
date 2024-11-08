import AddButton from '@/Components/Button/AddButton'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { brandTableHeader } from '../Lib/Constants'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import BrandForm from '../Components/BrandForm'
import SearchBar from '@/Components/Search/Index'
import { toast } from 'sonner'

export default function Brand({ auth, brands }) {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState('add')
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        setType('edit')
        setSelected(id)
        drawerRef.current.open()
    }

    const deleteAction = (id) => {
        setSelected(id)
        deleteModalRef.current.open()
    }

    const handleDelete = () => {
        router.delete(route('brands.destroy', selected), {
            onSuccess: () => {
                setSelected(null)
                toast.success('Success', {
                    description: 'Brand deleted successfully',
                })
                deleteModalRef.current.close()
            },
        })
    }

    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
            <Head title="Brands" />
            <div className="page-content">
                <div className="top-section">
                    <div className="title-wrapper">
                        <h1 className="title">Brands</h1>
                        <ul className="breadcrumb">
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Brands</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Brands'} />
                            </div>
                            <div className="add-brand">
                                <AddButton
                                    handleOnClick={() => {
                                        setType('add')
                                        drawerRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <TableComp
                        columns={brandTableHeader}
                        items={brands}
                        checkboxCell={true}
                        actions={{ editAction, deleteAction }}
                        pagination={true}
                    />

                </div>
            </div>
            <BrandForm drawerRef={drawerRef} selected={selected} type={type} />
            <DeleteModal
                ref={deleteModalRef}
                heading="Brand"
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
