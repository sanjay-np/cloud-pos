import AddButton from "@/Components/Button/AddButton"
import SearchBar from "@/Components/Search/Index"
import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head } from "@inertiajs/react"
import { ChevronRightIcon, LayoutGridIcon } from "lucide-react"
import { useRef, useState } from "react"
import PurchaseForm from "../Components/PurchaseForm"
import { Table } from "rsuite"
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"

export default function Index({ auth, purchases }) {
    const { Column, HeaderCell, Cell } = Table;
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
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={purchases?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Date</span></HeaderCell>
                                    <Cell dataKey="date" />
                                </Column>
                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Reference</span></HeaderCell>
                                    <Cell dataKey="reference" />
                                </Column>
                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Supplier Name</span></HeaderCell>
                                    <Cell dataKey="supplier.name" />
                                </Column>
                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                                    <Cell dataKey="total_amount" />
                                </Column>
                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Payment Status</span></HeaderCell>
                                    <Cell dataKey="payment_status" />
                                </Column>
                                <Column width={150}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey="status" />
                                </Column>

                                <Column width={100}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Actions</span></HeaderCell>
                                    <Cell className="link-group">
                                        {(rowData) => (
                                            <>
                                                <EditActionButton action={() => editAction(rowData.id)} />
                                                <DeleteActionButton action={() => deleteAction(rowData.id)} />
                                            </>
                                        )}
                                    </Cell>
                                </Column>

                            </Table>
                        </div>
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
