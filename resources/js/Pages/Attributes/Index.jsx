import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SearchComp from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import AttributeForm from '@/Components/Forms/AttributeForm'
import TableComp from '@/Components/Table/TableComp'
import { attributeTableHeader } from '@/Lib/Constants'
import { toast } from 'sonner'

export default function Index({ auth, attributes }) {
    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add");
    const drawerRef = useRef(false);
    const deleteModalRef = useRef(false);

    const editAction = (id) => {
        setType("edit");
        setSelected(id);
        drawerRef.current.open();
    }

    const deleteAction = (id) => {
        setSelected(id)
        deleteModalRef.current.open()
    }

    const handleDelete = () => {
        router.delete(route('attributes.destroy', selected), {
            onSuccess: () => {
                deleteModalRef.current.close()
                setSelected(null)
                toast.success('Success', {
                    description: 'Attribute deleted successfully',
                })
            },
        })
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
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchComp title={'Attributes'} />
                            </div>
                            <div className='add-product'>
                                <AddButton handleOnClick={() => {
                                    setType("add");
                                    drawerRef.current.open();
                                }} />
                            </div>
                        </div>
                    </div>
                    <TableComp
                        data={attributes?.data}
                        columns={attributeTableHeader}
                        checkboxCell={true}
                        actions={{
                            editAction,
                            deleteAction
                        }}
                    />
                </div>
            </div>
            <AttributeForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
            />
            <DeleteModal
                ref={deleteModalRef}
                title="Delete Attribute"
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
