import React from 'react'
import { Button, Drawer, Input, InputGroup, Placeholder } from 'rsuite'

export default function BrandrDrawer(props) {
    const { open, setOpen, title } = props
    const handleClose = () => setOpen(false)
    return (
        <React.Fragment>
            <Drawer open={open} onClose={handleClose} backdrop="static" size={'xs'} keyboard={false}>
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>{title} Brand</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={handleClose}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Brand Name</label>
                        <InputGroup>
                            <Input placeholder="Firm Name..." />
                        </InputGroup>
                    </div>
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
