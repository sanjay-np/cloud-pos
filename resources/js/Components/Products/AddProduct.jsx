import React from 'react'
import { ButtonToolbar, Drawer, IconButton, Placeholder } from 'rsuite'
import AddOutlineIcon from '@rsuite/icons/AddOutline';
export default function AddProduct() {
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
                size={'xs'}
                open={open}
                onClose={() => setOpen(false)}
                backdrop={'static'}
            >
                <Drawer.Body>
                    <Placeholder.Paragraph />
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
