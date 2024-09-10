import EmployeTable from '@/Components/Employees/EmployeTable'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import EmployeeDrawer from '@/Components/Employees/EmployeeDrawer'
import EmployeeAlert from '@/Components/Employees/EmployeeAlert'
export default function Index({ auth, employees }) {
    const [selectedEmployee, setSelectedEmployee] = useState(null)
    const [drawerState, setDrawerState] = useState(false)
    const [title, setTitle] = useState('Add')
    const [alertState, setAlertState] = useState(false)

    const handleAddState = () => {
        setTitle('Add')
        setDrawerState(true)
    }

    return (
        <Authenticated user={auth.user}>
            <Head title='Employees' />
            <div className="page-content employees-page">
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
                    <div className="add-employee">
                        <ButtonToolbar>
                            <IconButton size='lg' color='green' icon={<AddOutlineIcon />} appearance='primary' onClick={handleAddState}>
                                <span className='font-semibold'>Add New</span>
                            </IconButton>
                        </ButtonToolbar>
                    </div>
                </div>
                <div className="content-wrapper h-[500px] bg-white">
                    <EmployeTable
                        data={employees?.data}
                        setTitle={setTitle}
                        setSelectedEmployee={setSelectedEmployee}
                        setDrawerState={setDrawerState}
                        setAlertState={setAlertState}
                    />
                </div>
                <EmployeeDrawer
                    title={title}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                    open={drawerState}
                    setOpen={setDrawerState}
                />
                <EmployeeAlert
                    open={alertState}
                    setOpen={setAlertState}
                    selectedEmployee={selectedEmployee}
                    setSelectedEmployee={setSelectedEmployee}
                />
            </div>
        </Authenticated>
    )
}
