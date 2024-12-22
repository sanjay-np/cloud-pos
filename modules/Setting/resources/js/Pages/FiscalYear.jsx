import { Head, Link, router } from '@inertiajs/react'
import { useRef, useState } from 'react'
import { toast } from 'sonner'
import { Table } from 'rsuite'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import FiscalYearForm from '../Components/FiscalYearForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { DeleteActionButton, EditActionButton } from "@/Components/Table/TableActions"
import ToggleCell from '@/Components/Table/ToggleCell'


export default function FiscalYear({ auth, fiscalYears }) {
    const { Column, HeaderCell, Cell } = Table;
    const modalRef = useRef(false)
    const deleteModalRef = useRef(false)
    const [selected, setSelected] = useState(null)
    const [type, setType] = useState("add")

    const editAction = (id) => {
        setType("edit");
        setSelected(id);
        modalRef.current.open();
    };

    const deleteAction = (id) => {
        setSelected(id);
        deleteModalRef.current.open();
    };

    const handleDelete = () => {
        router.delete(route("fiscal-years.destroy", selected), {
            onSuccess: () => {
                deleteModalRef.current.close();
                setSelected(null);
                toast.success("Success", {
                    description: "Fiscal Year deleted successfully",
                });
            },
        });
    };
    return (
        <Authenticated user={auth.user} activeKey={['options']}>
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
                                        setType("add")
                                        modalRef.current.open()
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="tableWrapper">
                        <div className="tableContainer">
                            <Table data={fiscalYears?.data} hover bordered headerHeight={45} cellBordered autoHeight={true} rowHeight={50}>
                                <Column width={50} align='center'>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                                    <Cell>{(_, rowIndex) => rowIndex + 1}</Cell>
                                </Column>
                                <Column flexGrow={1}>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Fiscal Year</span></HeaderCell>
                                    <Cell dataKey='label' />
                                </Column>

                                <Column>
                                    <HeaderCell><span className="text-base font-semibold text-gray-600">Status</span></HeaderCell>
                                    <ToggleCell dataKey='is_current' />
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
            <FiscalYearForm drawerRef={modalRef} selected={selected} type={type} />
            <DeleteModal title=" Fiscal Year" ref={deleteModalRef} deleteAction={handleDelete} />
        </Authenticated>
    )
}
