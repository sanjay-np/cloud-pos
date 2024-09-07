import AddEmployee from '@/Components/Employees/AddEmployee'
import EmployeTable from '@/Components/Employees/EmployeTable'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React from 'react'

export default function Index({ auth, employees }) {
    console.log(employees);

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
                    <div className="">
                        <AddEmployee />
                    </div>
                </div>
                <div className="content-wrapper h-[500px] bg-white">
                    <EmployeTable data={employees?.data} />
                </div>
            </div>
        </Authenticated>
    )
}
