import EmployeTable from '@/Components/Employees/EmployeTable'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useState } from 'react'
import { ButtonToolbar, IconButton } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import EmployeeDrawer from '@/Components/Employees/EmployeeDrawer'
import EmployeeAlert from '@/Components/Employees/EmployeeAlert'
import SearchComp from '@/Components/Search/Index'
export default function Index({ auth, employees }) {
    const [selected, setSelected] = useState(null)
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
                            <li><Link href={route('dashboard')}><span>Dashboard</span></Link></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><Link href={route('employees.index')}><span>Employees</span></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between">
                            <div className="w-2/3">
                                <SearchComp />
                            </div>
                            <div className="add-employee">
                                <ButtonToolbar>
                                    <IconButton size='lg' color='green' icon={<AddOutlineIcon />} appearance='primary' onClick={handleAddState}>
                                        <span className='font-semibold'>Add New</span>
                                    </IconButton>
                                </ButtonToolbar>
                            </div>
                        </div>
                    </div>
                    <EmployeTable
                        data={employees?.data}
                        setTitle={setTitle}
                        setSelected={setSelected}
                        setDrawerState={setDrawerState}
                        setAlertState={setAlertState}
                    />
                </div>
                <EmployeeDrawer
                    title={title}
                    selected={selected}
                    setSelected={setSelected}
                    open={drawerState}
                    setOpen={setDrawerState}
                />
                <EmployeeAlert
                    open={alertState}
                    setOpen={setAlertState}
                    selected={selected}
                    setSelected={setSelected}
                />
            </div>
        </Authenticated>
    )
}
