import { Head, Link, router } from "@inertiajs/react";
import { ChevronRightIcon, LayoutGridIcon } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TableComp from "@/Components/Table/TableComp";
import AddButton from "@/Components/Button/AddButton";
import { employeeTableHeader } from "@/Lib/Constants";
import SearchBar from "@/Components/Search/Index";
import DeleteModal from "@/Components/Overlays/DeleteModal";
import EmployeeForm from "@/Components/Forms/EmployeeForm";

export default function Index({ auth, employees }) {
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
        router.delete(route("employees.destroy", selected), {
            onSuccess: () => {
                deleteModalRef.current.close();
                setSelected(null);
                toast.success("Success", {
                    description: "Employee deleted successfully",
                });
            },
        });
    };

    return (
        <Authenticated user={auth.user}>
            <Head title="Employees" />
            <div className="page-content employees-page">
                <div className="top-section">
                    <div className="title-wrapper">
                        <h1 className="title">Employees</h1>
                        <ul className="breadcrumb">
                            <li><LayoutGridIcon color="gray" size={20} /></li>
                            <li><ChevronRightIcon color="gray" size={14} /></li>
                            <li><Link href={route("dashboard")}><span>Dashboard</span></Link></li>
                            <li><ChevronRightIcon color="gray" size={14} /></li>
                            <li><Link href={route("employees.index")}><span>Employees</span></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="top-wrapper p-4">
                        <div className="flex items-center justify-between gap-4">
                            <div className="w-full">
                                <SearchBar title="Employees" />
                            </div>
                            <div className="add-employee">
                                <AddButton
                                    handleOnClick={() => {
                                        setType("add");
                                        drawerRef.current.open();
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="table-wrapper">
                        <TableComp
                            items={employees}
                            checkboxCell={true}
                            columns={employeeTableHeader}
                            actions={{ editAction, deleteAction }}
                            pagination={true}
                        />
                    </div>
                </div>
            </div>
            <EmployeeForm
                drawerRef={drawerRef}
                selected={selected}
                type={type}
            />
            <DeleteModal
                title="Employee"
                ref={deleteModalRef}
                deleteAction={handleDelete}
            />
        </Authenticated>
    );
}
