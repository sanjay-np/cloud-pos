import AddButton from "@/Components/Button/AddButton"
import SearchBar from "@/Components/Search/Index"
import TableComp from "@/Components/Table/TableComp"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { ChevronRightIcon, LayoutGridIcon } from "lucide-react"
import { useRef, useState } from "react"
import { PURCHASE_TABLE_HEADER } from "../Lib/Constants"
import PurchaseForm from "../Components/PurchaseForm"

export default function Index({ auth, purchases }) {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add");
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => {
        // Todo: Edit action
    }

    const deleteAction = (id) => {
        // Todo: Delete action
    }

    const paymentAction = (id) => {

    }


    return (
        <Authenticated user={auth.user}>
            <Head title='Purchases' />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Purchases</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Purchases</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Purhcases'} />
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
                            items={purchases}
                            columns={PURCHASE_TABLE_HEADER}
                            actions={{ editAction, deleteAction, paymentAction }}
                            pagination
                            serialize
                        />
                    </div>
                </div>
            </div>
            <PurchaseForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
            />
        </Authenticated>
    )
}
