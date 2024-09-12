import React from 'react'
import { Button, Drawer, Input, InputGroup, Placeholder } from 'rsuite'

export default function SupplierDrawer(props) {
    const { open, setOpen, title } = props
    const handleClose = () => setOpen(false)
    return (
        <React.Fragment>
            <Drawer open={open} onClose={handleClose} backdrop="static" size={'xs'} keyboard={false}>
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>{title} Supplier</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={handleClose}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Name</label>
                        <InputGroup>
                            <Input placeholder="Firm Name..." />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Contact</label>
                        <InputGroup>
                            <Input placeholder="Firm Contact..." />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Contact Person Name </label>
                        <InputGroup>
                            <Input placeholder="Contact Person Name..." />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Firm Address </label>
                        <InputGroup>
                            <Input placeholder="Firm Address..." />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>PAN Number </label>
                        <InputGroup>
                            <Input placeholder="PAN Number..." />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Supplying Brands </label>
                        <InputGroup>
                            <Input placeholder="Firm Address..." />
                        </InputGroup>
                    </div>

                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
