import InputError from "@/Components/InputError";
import FormDrawer from "@/Components/Overlays/FormDrawer";
import { department, documentType, employeeStatus, position, } from "@/Lib/Constants";
import { previewFile } from "@/Lib/Utils";
import { router, useForm } from "@inertiajs/react";
import { FileTextIcon, PhoneCallIcon, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { HStack, Input, InputGroup, Loader, SelectPicker, Uploader, } from "rsuite";
import { toast } from "sonner";

export default function EmployeeForm(props) {
    const { drawerRef, selected, type } = props;

    const [loading, setLoading] = useState(false);
    const [avatar, setAvatar] = useState(null);
    const [documentFiles, setDocumentFiles] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        phone: "",
        department: "",
        position: "",
        document_type: "",
        document_number: "",
        avatar: null,
        document_files: [],
        status: "",
    });

    useEffect(() => {
        if (!selected) return;
        if (type !== "edit") return;
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await axios.get(route("employees.find", selected));
                setData(res?.data);
                setAvatar(res?.data?.avatar_url);
                setDocumentFiles(res?.data?.document_list);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [selected]);

    const onSubmit = () => {
        if (!selected && type === "add") {
            post(route("employees.store"), {
                onSuccess: () => {
                    drawerRef.current.close();
                    setAvatar(null);
                    toast.success("Success", {
                        description: "Employee added successfully",
                    });
                },
            });
        }
        if (selected && type === "edit") {
            router.post(
                route("employees.update", selected), {
                _method: "put",
                ...data,
            }, {
                onSuccess: () => {
                    setAvatar(null);
                    setDocumentFiles([]);
                    drawerRef.current.close();
                    reset();
                    toast.success("Success", {
                        description: "Employee updated successfully",
                    });
                },
            });
        }
    };

    const formClear = () => {
        reset();
        setDocumentFiles([]);
        setAvatar(null);
    };

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? "Edit Employee" : "Create New Employee"}
            reset={formClear}
            size="sm"
        >
            {loading ? (
                <Loader center content="loading" />
            ) : (
                <>
                    <HStack spacing={20}>
                        <div className="w-3/4">
                            <div className="form-item mb-4">
                                <label className="text-gray-600 font-semibold mb-1 block">
                                    Employee Name
                                </label>
                                <InputGroup inside>
                                    <Input
                                        placeholder="Employee Name..."
                                        className="text-base"
                                        type="text"
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(value) =>
                                            setData("name", value)
                                        }
                                    />
                                </InputGroup>
                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>
                            <div className="form-item mb-4">
                                <label className="text-gray-600 font-semibold mb-1 block">
                                    Phone Number
                                </label>
                                <InputGroup className="form-item mb-4" inside>                                    
                                    <Input
                                        placeholder="Phone Number..."
                                        className="text-base"
                                        type="text"
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(value) =>
                                            setData("phone", value)
                                        }
                                    />
                                </InputGroup>
                                <InputError
                                    message={errors.phone}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="w-1/4">
                            <Uploader
                                className="avatar-uploader"
                                fileListVisible={false}
                                listType="picture"
                                action="/"
                                autoUpload={false}
                                onChange={(file) => {
                                    previewFile(file[0]?.blobFile, (value) => {
                                        setAvatar(value);
                                    });
                                    setData("avatar", file[0]);
                                }}
                            >
                                <button style={{ width: 140, height: 140 }}>
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            width="100%"
                                            height="100%"
                                        />
                                    ) : (
                                        <User2Icon
                                            size={64}
                                            strokeWidth={1.2}
                                            color="gray"
                                        />
                                    )}
                                </button>
                            </Uploader>
                        </div>
                    </HStack>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Department
                        </label>
                        <SelectPicker
                            data={department}
                            className="text-base w-full"
                            placeholder="Select Department"
                            value={data.department}
                            onChange={(value) => setData("department", value)}
                        />
                        <InputError
                            message={errors.department}
                            className="mt-2"
                        />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Position
                        </label>
                        <SelectPicker
                            data={position}
                            className="text-base w-full"
                            placeholder="Select Position"
                            value={data.position}
                            onChange={(value) => setData("position", value)}
                        />
                        <InputError
                            message={errors.position}
                            className="mt-2"
                        />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Document Validation Type
                        </label>
                        <SelectPicker
                            data={documentType}
                            className="text-base w-full"
                            placeholder="Select Validation Document"
                            value={data.document_type}
                            onChange={(value) =>
                                setData("document_type", value)
                            }
                        />
                        <InputError
                            message={errors.document_type}
                            className="mt-2"
                        />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Document Number{" "}
                        </label>
                        <InputGroup inside>                            
                            <Input
                                placeholder="Document Number..."
                                className="text-base"
                                type="text"
                                autoComplete="off"
                                value={data.document_number}
                                onChange={(value) =>
                                    setData("document_number", value)
                                }
                            />
                        </InputGroup>
                        <InputError
                            message={errors.document_number}
                            className="mt-2"
                        />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Document Files
                        </label>
                        <Uploader
                            listType="picture-text"
                            action="/"
                            autoUpload={false}
                            draggable
                            defaultFileList={[...documentFiles]}
                            onChange={(file) => {
                                setData("document_files", file);
                            }}
                        >
                            <div
                                style={{
                                    height: 200,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <span>
                                    Click or Drag files to this area to upload
                                </span>
                            </div>
                        </Uploader>
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">
                            Employee Status
                        </label>
                        <SelectPicker
                            data={employeeStatus}
                            className="text-base w-full"
                            placeholder="Select Status"
                            value={data.status}
                            onChange={(value) => setData("status", value)}
                            placement="auto"
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                </>
            )}
        </FormDrawer>
    );
}
