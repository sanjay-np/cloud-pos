import { router, useForm } from '@inertiajs/react';
import { FileTextIcon, PhoneCallIcon, User2Icon } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react'
import { Button, Drawer, HStack, Input, InputGroup, Loader, SelectPicker, Uploader } from 'rsuite'
import InputError from '../InputError';
import axios from 'axios';
import { previewFile } from '@/Lib/Utils';
import { toast } from 'sonner';

export default function EmployeeDrawer(props) {
    const { title, selected, setSelected, open, setOpen } = props
    const uploader = useRef();
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null);
    const [documentFiles, setDocumentFiles] = useState([]);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        department: '',
        position: '',
        document_type: '',
        document_number: '',
        avatar: null,
        document_files: [],
        status: ''
    });

    useEffect(() => {
        if (!selected) return;
        if (title !== 'Edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('employees.find', selected));
                setData(res?.data);
                setAvatar(res?.data?.avatar_url);
                setDocumentFiles(res?.data?.document_list);
            } catch (err) {
                console.log(err);

            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, [selected])

    const handleClose = () => {
        setSelected(null)
        setAvatar(null)
        setDocumentFiles([])
        reset()
        setOpen(false)
    }

    const onSubmit = () => {
        if (title === 'Add') {
            post(route('employees.store'), {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                    setAvatar(null)
                    toast.success('Success', {
                        description: 'Employee added successfully',
                    })
                },
            })
        } else if (title === 'Edit') {
            router.post(route('employees.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setOpen(false)
                    setSelected(null)
                    setAvatar(null)
                    setDocumentFiles([])
                    reset()
                    toast.success('Success', {
                        description: 'Employee updated successfully',
                    })
                },
            })
        }
    }



    return (
        <React.Fragment>
            <Drawer backdrop={'static'} open={open} onClose={handleClose} className='employee-drawer'>
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>{title} Employee</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={onSubmit} loading={processing}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    {loading ? (
                        <Loader center content="loading" />
                    ) : (
                        <React.Fragment>
                            <HStack spacing={20}>
                                <div className="w-3/4">
                                    <div className='form-item mb-4'>
                                        <label className='text-gray-600 font-semibold mb-1 block'>Employee Name</label>
                                        <InputGroup inside>
                                            <InputGroup.Addon>
                                                <User2Icon color='gray' size={20} strokeWidth={1.6} />
                                            </InputGroup.Addon>
                                            <Input
                                                placeholder='Employee Name...'
                                                className='text-base'
                                                type='text'
                                                autoComplete='name'
                                                value={data.name}
                                                onChange={value => setData('name', value)}
                                            />
                                        </InputGroup>
                                        <InputError message={errors.name} className="mt-2" />
                                    </div>
                                    <div className="form-item mb-4">
                                        <label className='text-gray-600 font-semibold mb-1 block'>Phone Number</label>
                                        <InputGroup className='form-item mb-4' inside>
                                            <InputGroup.Addon>
                                                <PhoneCallIcon color='gray' size={20} strokeWidth={1.6} />
                                            </InputGroup.Addon>
                                            <Input
                                                placeholder='Phone Number...'
                                                className='text-base'
                                                type='text'
                                                autoComplete='tel'
                                                value={data.phone}
                                                onChange={value => setData('phone', value)}
                                            />
                                        </InputGroup>
                                        <InputError message={errors.phone} className="mt-2" />
                                    </div>
                                </div>
                                <div className="w-1/4">
                                    <Uploader
                                        className='avatar-uploader'
                                        fileListVisible={false}
                                        listType="picture"
                                        action="/"
                                        autoUpload={false}
                                        ref={uploader}
                                        onChange={file => {
                                            previewFile(file[0]?.blobFile, value => {
                                                setAvatar(value);
                                            });
                                            setData('avatar', file[0]);
                                        }}
                                    >
                                        <button style={{ width: 140, height: 140 }}>
                                            {avatar ? (
                                                <img src={avatar} width="100%" height="100%" />
                                            ) : (
                                                <User2Icon size={64} strokeWidth={1.2} color='gray' />
                                            )}
                                        </button>
                                    </Uploader>
                                </div>
                            </HStack>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Department</label>
                                <SelectPicker
                                    data={[
                                        { label: 'IT', value: "IT" },
                                        { label: 'HR', value: "HR" },
                                        { label: 'Finance', value: "Finance" },
                                        { label: 'Accounting', value: "Accounting" },
                                        { label: 'Marketing', value: "Marketing" },
                                        { label: 'Sales', value: "Sales" },
                                        { label: 'Admin', value: "Admin" },
                                        { label: 'Other', value: "Other" },
                                    ]}
                                    className='text-base w-full'
                                    size='lg'
                                    placeholder="Select Department"
                                    value={data.department}
                                    onChange={value => setData('department', value)}
                                />
                                <InputError message={errors.department} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Department</label>
                                <SelectPicker
                                    data={[
                                        { label: 'Director', value: "Director" },
                                        { label: 'Accountant', value: "Accountant" },
                                        { label: 'Clerk', value: "Clerk" },
                                        { label: 'Receptionist', value: "Receptionist" },
                                        { label: 'Supervisor', value: "Supervisor" },
                                        { label: 'Administrator', value: "Administrator" },
                                        { label: 'Manager', value: "Manager" },
                                        { label: 'Employee', value: "Employee" },
                                        { label: 'Other', value: "Other" },
                                    ]}
                                    className='text-base w-full'
                                    size='lg'
                                    placeholder="Select Position"
                                    value={data.position}
                                    onChange={value => setData('position', value)}
                                />
                                <InputError message={errors.position} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Document Validation Type</label>
                                <SelectPicker
                                    data={[
                                        { label: 'Citizen Ship', value: "citizen_ship" },
                                        { label: 'Passport', value: "passport" },
                                        { label: 'Driving License', value: "driving_license" },
                                    ]}
                                    className='text-base w-full'
                                    size='lg'
                                    placeholder="Select Validation Document"
                                    value={data.document_type}
                                    onChange={value => setData('document_type', value)}
                                />
                                <InputError message={errors.document_type} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Document Number </label>
                                <InputGroup inside>
                                    <InputGroup.Addon>
                                        <FileTextIcon color='gray' size={20} strokeWidth={1.6} />
                                    </InputGroup.Addon>
                                    <Input
                                        placeholder='Document Number...'
                                        className='text-base'
                                        type='text'
                                        autoComplete='off'
                                        value={data.document_number}
                                        onChange={value => setData('document_number', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.document_number} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Document Files</label>
                                <Uploader
                                    listType='picture-text'
                                    action="/"
                                    autoUpload={false}
                                    draggable
                                    defaultFileList={documentFiles}
                                    onChange={file => { setData('document_files', file); }}
                                >
                                    <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span>Click or Drag files to this area to upload</span>
                                    </div>
                                </Uploader>
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Employee Status</label>
                                <SelectPicker
                                    data={[
                                        { label: 'On Hold', value: "on_hold" },
                                        { label: 'Active', value: "active" },
                                        { label: 'Suspended', value: "suspended" },
                                        { label: 'Resigned', value: "resigned" },
                                    ]}
                                    className='text-base w-full'
                                    size='lg'
                                    placeholder="Select Status"
                                    value={data.status}
                                    onChange={value => setData('status', value)}
                                    placement='auto'
                                />
                                <InputError message={errors.status} className="mt-2" />
                            </div>
                        </React.Fragment>
                    )}
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
