import Authenticated from "@/Layouts/AuthenticatedLayout"
import { Head, router } from "@inertiajs/react"
import { ChevronRightIcon, LayoutGridIcon } from "lucide-react"
import { useRef, useState } from "react"
import { Table } from "rsuite"
import { toast } from "sonner"
import AddButton from "@/Components/Button/AddButton"
import SearchBar from "@/Components/Search/Index"
import CustomerForm from "../Components/CustomerForm"
import DeleteModal from "@/Components/Overlays/DeleteModal"
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"


export default function Index({ auth, customers }) {

    const { Column, HeaderCell, Cell } = Table
    const [selected, setSelected] = useState(null);
    const [type, setType] = useState("add");
    const drawerRef = useRef(false);
    const deleteModalRef = useRef(false);

    const editAction = (id) => {
        setType("edit");
        setSelected(id);
        drawerRef.current.open();
    };

    const deleteAction = (id) => {
        setSelected(id);
        deleteModalRef.current.open();
    };

    const handleDelete = () => {
        router.delete(route('customers.destroy', selected), {
            onSuccess: () => {
                deleteModalRef.current.close();
                setSelected(null);
                toast.success('Success', {
                    description: 'Customer deleted successfully',
                });
            },
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title='Customers' />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Customers</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Customers</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className='w-full'>
                                <SearchBar title={'Customers'} />
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
                            <Table data={customers?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50} align="center">
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Customer Name</span></HeaderCell>
                                    <Cell dataKey="name" />
                                </Column>

                                <Column width={200}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Phone</span></HeaderCell>
                                    <Cell dataKey="phone" />
                                </Column>

                                <Column width={200}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <Cell dataKey="status" />
                                </Column>

                                <Column>
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
            <CustomerForm drawerRef={drawerRef} selected={selected} type={type} />
            <DeleteModal title={'Customer'} ref={deleteModalRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}