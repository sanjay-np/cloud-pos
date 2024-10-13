import AddButton from "@/Components/Button/AddButton"
import PurchaseForm from "@/Components/Forms/PurchaseForm"
import SearchBar from "@/Components/Search/Index"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { ChevronRightIcon, LayoutGridIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Toggle } from "rsuite"

const Index = ({ auth }) => {

    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add");
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)


    return (
        <Authenticated user={auth.user}>
            <Head title='purchases' />
            <div className="page-content purchases-page">
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
                            <div className="toggle">
                                <Toggle
                                    size={'lg'}
                                    color="green"
                                />
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
                    <PurchaseForm
                        drawerRef={drawerRef}
                        selected={selected}
                    />
                </div>
            </div>
        </Authenticated>
    )
}
export default Index