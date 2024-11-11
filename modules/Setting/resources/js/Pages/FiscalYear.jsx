import AddButton from '@/Components/Button/AddButton'
import SearchBar from '@/Components/Search/Index'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { fiscalYearTableHeader } from '../Lib/Constants'
import FiscalYearForm from '../Components/FiscalYearForm'
import DeleteModal from '@/Components/Overlays/DeleteModal'
import { toast } from 'sonner'


export default function FiscalYear({ auth, fiscalYears }) {

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
                    <div className="table-wrapper">
                        <TableComp
                            items={fiscalYears}
                            checkboxCell={false}
                            columns={fiscalYearTableHeader}
                            actions={{
                                editAction,
                                deleteAction
                            }}
                            pagination={true}
                            serialize
                        />
                    </div>
                </div>
            </div>
            <FiscalYearForm
                drawerRef={modalRef}
                selected={selected}
                type={type}
            />
            <DeleteModal
                ref={deleteModalRef}
                deleteAction={handleDelete}
                title=" Fiscal Year"
            />
        </Authenticated>
    )
}
