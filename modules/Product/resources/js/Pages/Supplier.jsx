import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import SupplierForm from '../Components/SupplierForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { toast } from 'sonner'
import { Table } from 'rsuite'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"


export default function Supplier({ auth, brands, suppliers }) {
    const { Column, HeaderCell, Cell } = Table;
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
        router.delete(route('suppliers.destroy', selected), {
            onSuccess: () => {
                setSelected(null)
                toast.success('Success', {
                    description: 'Supplier deleted successfully',
                })
                deleteModalRef.current.close()
            },
        })
    }

    return (
        <Authenticated user={auth?.user} activeKey={['products']}>
            <Head title="Suppliers" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Suppliers</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Products</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Suppliers</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Suppliers'} />
                            </div>
                            <div className="add-category">
                                <AddButton
                                    handleOnClick={() => {
                                        setType("add")
                                        drawerRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={suppliers?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>

                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Supplier Name</span></HeaderCell>
                                    <Cell dataKey='name' />
                                </Column>

                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Contact Person</span></HeaderCell>
                                    <Cell dataKey='contact_person' />
                                </Column>

                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Phone</span></HeaderCell>
                                    <Cell dataKey='phone' />
                                </Column>

                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">PAN No.</span></HeaderCell>
                                    <Cell dataKey='pan' />
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
            <SupplierForm drawerRef={drawerRef} selected={selected} type={type} brands={brands} />
            <DeleteModal ref={deleteModalRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}
