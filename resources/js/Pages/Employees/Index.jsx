
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import SearchComp from '@/Components/Search/Index'
import TableComp from '@/Components/Table/TableComp'
import AddButton from '@/Components/Button/AddButton';
import { useRef, useState } from 'react'
import EmployeeForm from './EmployeeForm'

export default function Index({ auth, employees }) {

    const [selected, setSelected] = useState(null)
    const drawerRef = useRef(false)
    const alertRef = useRef(false)

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
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-full">
                                <SearchComp />
                            </div>
                            <div className="add-employee">
                                <AddButton handleOnClick={() => drawerRef.current.open()} />
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <TableComp
                            data={employees?.data}
                            checkboxCell={true}
                            columns={[
                                {
                                    title: "Employee Name",
                                    dataKey: "name"
                                }, {
                                    title: "Email",
                                    dataKey: "email"
                                }, {
                                    title: "Phone",
                                    dataKey: "phone"
                                }
                            ]}
                            actionCell={[
                                {
                                    name: 'edit',
                                    action: 'edit'
                                }, {
                                    name: 'delete',
                                    action: 'delete'
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
            <EmployeeForm
                drawerRef={drawerRef}
                selected={selected}
            />
        </Authenticated >
    )
}
