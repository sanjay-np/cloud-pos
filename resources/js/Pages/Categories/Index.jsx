import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SearchBar from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import TableComp from '@/Components/Table/TableComp'
import { categoryTableHeader } from '@/Lib/Constants'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import CategoryForm from '@/Components/Forms/CategoryForm'


export default function Index({ auth, categories }) {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add")
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        setType("edit")
        setSelected(id)
        drawerRef.current.open()
    }

    const deleteAction = (id) => {
        setSelected(id)
        deleteModalRef.current.open()
    }

    const handleDelete = () => {
        router.delete(route('categories.destroy', selected), {
            onSuccess: () => {
                setOpen(false)
                setSelected(null)
                toast.success('Success', {
                    description: 'Brand deleted successfully',
                })
            },
        })
    }

    return (
        <Authenticated user={auth.user} activeKey={['products']}>
            <Head title="Categories" />
            <div className="page-content">
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
                                <SearchBar title={'Categories'} />
                            </div>
                            <div className="add-category">
                                <AddButton handleOnClick={() => {
                                    setType("add")
                                    drawerRef.current.open()
                                }} />
                            </div>
                        </div>
                    </div>
                    <TableComp
                        items={categories}
                        checkboxCell={true}
                        columns={categoryTableHeader}
                        actions={{ editAction, deleteAction }}
                        pagination={true}
                    />
                </div>
            </div>
            <CategoryForm
                drawerRef={drawerRef}
                type={type}
                selected={selected}
            />
            <DeleteModal
                title="Category"
                ref={deleteModalRef}
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
