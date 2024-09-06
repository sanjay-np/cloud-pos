import React from 'react'
import { Button, ButtonToolbar, Drawer, FlexboxGrid, HStack, IconButton, Input, InputGroup, Placeholder, SelectPicker, Uploader } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
import { CameraIcon, MailIcon, PhoneCallIcon, User2Icon } from 'lucide-react';
export default function AddEmployee() {
    const [open, setOpen] = React.useState(false)
    return (
        <React.Fragment>
            <ButtonToolbar>
                <IconButton
                    size='lg'
                    color='green'
                    icon={<AddOutlineIcon />}
                    appearance='primary'
                    onClick={() => setOpen(true)}
                >
                    <span className='font-semibold'>Add New</span>
                </IconButton>
            </ButtonToolbar>
            <Drawer
                placement='right'
                size={'sm'}
                open={open}
                onClose={() => setOpen(false)}
                backdrop={'static'}
            >
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>Add New Employee</Drawer.Title>
                    <Drawer.Actions>
                        <Button size='sm' appearance='primary' color='red'><span className='font-semibold'>Cancel</span></Button>
                        <Button
                            appearance="primary"
                            size='sm'
                            color='green'>
                            <span className='font-semibold'>Confirm</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='px-6 py-4'>
                    <HStack spacing={20}>
                        <div className="w-3/4">
                            <div className='form-item mb-4'>
                                <label className='text-gray-600 font-semibold mb-1 block'>Employee Name</label>
                                <InputGroup>
                                    <InputGroup.Addon>
                                        <User2Icon color='gray' size={20} strokeWidth={1.6} />
                                    </InputGroup.Addon>
                                    <Input
                                        placeholder='Employee Name...'
                                        className='text-base'
                                    />
                                </InputGroup>
                            </div>
                            <div className="form-item mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Phone Number</label>
                                <InputGroup className='form-item mb-4'>
                                    <InputGroup.Addon>
                                        <PhoneCallIcon color='gray' size={20} strokeWidth={1.6} />
                                    </InputGroup.Addon>
                                    <Input
                                        placeholder='Phone Number...'
                                        className='text-base'
                                    />
                                </InputGroup>
                            </div>
                        </div>
                        <div className="w-1/4">
                            <Uploader multiple listType="picture" action="//jsonplaceholder.typicode.com/posts/" className='w-full'>
                                <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <button><CameraIcon /></button>
                                </div>
                            </Uploader>
                        </div>
                    </HStack>

                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Emaill Address </label>
                        <InputGroup>
                            <InputGroup.Addon>
                                <MailIcon color='gray' size={20} strokeWidth={1.6} />
                            </InputGroup.Addon>
                            <Input
                                placeholder='Employee Name...'
                                className='text-base'
                            />
                        </InputGroup>
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Documnet Validation Type</label>
                        <SelectPicker
                            data={[
                                { label: 'Citizen Ship', value: 1 },
                                { label: 'Passport', value: 2 },
                                { label: 'Driving License', value: 3 },
                            ]}
                            className='text-base w-full'
                            size='lg'
                            placeholder="Select Validation Document"
                        />
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Document Files</label>
                        <Uploader action="//jsonplaceholder.typicode.com/posts/" draggable>
                            <div style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span>Click or Drag files to this area to upload</span>
                            </div>
                        </Uploader>
                    </div>
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
