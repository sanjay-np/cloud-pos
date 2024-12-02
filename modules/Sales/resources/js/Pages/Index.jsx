import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { SALES_TABLE_HEADER } from '../Lib/Constants'
import SalesForm from '../Components/SalesForm'

export default function Index({ auth, sales }) {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add");
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => { }

    const deleteAction = (id) => { }

    return (
        <Authenticated user={auth.user}>
            <Head title='Sales' />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Sales</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Sales</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Sales'} />
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
                    <div className="table-wrapper">
                        <TableComp
                            items={sales}
                            columns={SALES_TABLE_HEADER}
                            actions={{ editAction, deleteAction }}
                            pagination
                            serialize
                        />
                    </div>
                </div>
            </div>
            <SalesForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
            />
        </Authenticated>
    )
}
