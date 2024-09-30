import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Drawer } from 'rsuite'

const FormDrawer = forwardRef(({ children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => {
            props?.reset()
            setIsOpen(false)
        }
    }))
    return (
        <Drawer backdrop={'static'} open={isOpen} onClose={ref?.current?.close} size={props?.size ?? 'xs'} keyboard={false}>
            <Drawer.Header className='pe-6 items-center'>
                <Drawer.Title className='font-semibold text-gray-600'>{props?.drawerTitle}</Drawer.Title>
                <Drawer.Actions>
                    <Button appearance="primary" color='green' onClick={props?.onSubmit} loading={props?.processing}>
                        <span className='font-semibold'>Submit</span>
                    </Button>
                </Drawer.Actions>
            </Drawer.Header>
            <Drawer.Body className='p-6'>
                {children}
            </Drawer.Body>
        </Drawer>
    )
})
export default FormDrawer