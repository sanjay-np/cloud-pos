import AddButton from '@/Components/Button/AddButton'
import FiscalYearForm from '@/Components/Forms/FiscalYearForm'
import FormModal from '@/Components/Overlays/FormModal'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef } from 'react'

export default function Index({ auth }) {

    const createModal = useRef(false)

    return (
        <Authenticated user={auth.user}>
            <Head title="Fiscal Years" />
            <div className="page-content">
                <div className="top-section">
                    <div className="title-wrapper">
                        <h1 className="title">Fiscal Years</h1>
                        <ul className="breadcrumb">
                            <li><LayoutGridIcon color="gray" size={20} /></li>
                            <li><ChevronRightIcon color="gray" size={14} /></li>
                            <li><Link href={route("dashboard")}><span>Dashboard</span></Link></li>
                            <li><ChevronRightIcon color="gray" size={14} /></li>
                            <li><Link href={'#'}><span>Fiscal Years</span></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-full">
                                <SearchBar title="." />
                            </div>
                            <div className="add-employee">
                                <AddButton
                                    handleOnClick={() => {
                                        createModal.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FiscalYearForm
                drawerRef={createModal}
                type="add"
                selected={null}
            />
        </Authenticated>
    )
}
