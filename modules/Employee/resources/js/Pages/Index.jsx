import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import EmployeeForm from '../Components/EmployeeForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { Table } from 'rsuite'
import Pagination from '@/Components/Table/Pagination'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"

export default function Index({ auth, employees }) {

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
        if (!selected) return
        router.delete(route('employees.destroy', selected), {
            onSuccess: () => {
                deleteModalRef.current.close()
                setSelected(null)
                toast.success('Success', {
                    description: 'Employee deleted successfully',
                })
            }
        })
    }
    return (
        <Authenticated user={auth?.user}>
            <Head title="Employees" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Employees</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Employees</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Employees'} />
                            </div>
                            <div className="add-category">
                                <AddButton
                                    handleOnClick={() => {
                                        setType('add')
                                        drawerRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={employees?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Employee Name</span></HeaderCell>
                                    <Cell dataKey="name" />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Phone No.</span></HeaderCell>
                                    <Cell dataKey="phone" />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Department</span></HeaderCell>
                                    <Cell dataKey="department" />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Position</span></HeaderCell>
                                    <Cell dataKey="position" />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey="status" />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                                    <Cell className="link-group">
                                        {(rowData) => {
                                            return (
                                                <>
                                                    <EditActionButton action={() => editAction(rowData.id)} />
                                                    <DeleteActionButton action={() => deleteAction(rowData.id)} />
                                                </>
                                            )
                                        }}
                                    </Cell>
                                </Column>
                            </Table>
                        </div>
                        {employees && employees?.links && (
                            <div className="pagination-wrapper">
                                <Pagination data={employees} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <EmployeeForm drawerRef={drawerRef} selected={selected} type={type} />
            <DeleteModal title={'Employee'} ref={deleteModalRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}
