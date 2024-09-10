import AddEmployee from '@/Components/Employees/AddEmployee'
import DeleteEmployee from '@/Components/Employees/DeleteEmployee'
import EditEmployee from '@/Components/Employees/EditEmployee'
import EmployeTable from '@/Components/Employees/EmployeTable'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useState } from 'react'

export default function Index({ auth, employees }) {

    const [selectedId, setSelectedId] = useState(null)
    const [editModal, setEditModal] = useState(false)
    const [deleteModal, setDeleteModal] = useState(false)

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
                        <AddEmployee />
                    </div>
                </div>
                <div className="content-wrapper h-[500px] bg-white">
                    <EmployeTable
                        data={employees?.data}
                        setSelectedId={setSelectedId}
                        setEditModal={setEditModal}
                        setDeleteModal={setDeleteModal}
                    />
                </div>
                <EditEmployee
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    open={editModal}
                    setOpen={setEditModal}
                />
                <DeleteEmployee
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    open={deleteModal}
                    setOpen={setDeleteModal}
                />
            </div>
        </Authenticated>
    )
}
