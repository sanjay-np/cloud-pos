import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { EMPLOYEE_TABLE_HEADER } from '../Lib/Constants'
import EmployeeForm from '../Components/EmployeeForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'

export default function Index({ auth, employees }) {

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
                    <TableComp
                        items={employees}
                        checkboxCell={true}
                        columns={EMPLOYEE_TABLE_HEADER}
                        actions={{ editAction, deleteAction }}
                        pagination={true}
                    />
                </div>
            </div>
            <EmployeeForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
            />
            <DeleteModal
                title={'Employee'}
                ref={deleteModalRef}
                deleteAction={handleDelete}
            />
        </Authenticated>
    )
}
