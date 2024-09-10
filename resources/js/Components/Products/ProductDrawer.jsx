import React from 'react'
import { Button, Drawer, Placeholder } from 'rsuite'
export default function ProductDrawer(props) {

    const { open, setOpen } = props

    return (
        <React.Fragment>
            <Drawer
                placement='right'
                size={'sm'}
                open={open}
                onClose={() => setOpen(false)}
                backdrop={'static'}
            >
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>Add Product</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={() => setOpen(false)}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    <Placeholder.Paragraph />
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
