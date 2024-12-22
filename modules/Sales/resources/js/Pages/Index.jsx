import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Table } from 'rsuite'
import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import SalesForm from '../Components/SalesForm'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"

export default function Index({ auth, sales, currency }) {
    const { Column, HeaderCell, Cell } = Table
    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add");
    const drawerRef = useRef(false)
    const deleteModalRef = useRef(false)

    const editAction = (id) => { }

    const deleteAction = (id) => { }

    const paymentAction = (id) => { }

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
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={sales.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50} align='center'>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column width={110}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Date</span></HeaderCell>
                                    <Cell dataKey='date' />
                                </Column>

                                <Column width={120}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Reference</span></HeaderCell>
                                    <Cell dataKey='reference' />
                                </Column>

                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Customer Name</span></HeaderCell>
                                    <Cell dataKey='customer.name' />
                                </Column>

                                <Column width={80}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                                    <Cell>{(rowData) => (<span>{currency} {rowData.total_amount}</span>)}</Cell>
                                </Column>

                                <Column width={140}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Payment Status</span></HeaderCell>
                                    <Cell dataKey='payment_status' />
                                </Column>

                                <Column width={110}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey='status' />
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
            <SalesForm drawerRef={drawerRef} selected={selected} type={type} />
        </Authenticated>
    )
}
