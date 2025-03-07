import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SearchBar from '@/Components/Search/Index'
import AddButton from '@/Components/Button/AddButton'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { toast } from 'sonner'
import AttributeForm from '../Components/AttributeForm'
import { Table } from 'rsuite'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"

export default function Attribute({ auth, attributes }) {
    const { Column, HeaderCell, Cell } = Table;
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
        <Authenticated user={auth?.user} activeKey={['products']}>
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
                                <SearchBar title={'Attributes'} />
                            </div>
                            <div className='add-product'>
                                <AddButton handleOnClick={() => {
                                    setType("add");
                                    drawerRef.current.open();
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <div className="table-container">
                            <Table data={attributes?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Attribute Name</span></HeaderCell>
                                    <Cell dataKey="name" />
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Description</span></HeaderCell>
                                    <Cell dataKey="description" />
                                </Column>
                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey="status" />
                                </Column>

                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                                    <Cell className="link-group">
                                        {(rowData) => (
                                            <>
                                                <EditActionButton action={() => editAction(rowData.id)} />
                                                <DeleteActionButton action={() => deleteAction(rowData.id)} />
                                            </>
                                        )}
                                    </Cell>
                                </Column>
                            </Table>
                        </div>
                    </div>
                </div>
            </div>
            <AttributeForm drawerRef={drawerRef} selected={selected} type={type} />
            <DeleteModal title="Delete Attribute" ref={deleteModalRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}
