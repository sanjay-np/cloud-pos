import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal } from 'rsuite'

const FormModal = forwardRef(({ children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => {
            props?.reset()
            setIsOpen(false)
        },
    }))
    return (
        <Modal backdrop="static" role="alertdialog" open={isOpen} onClose={ref?.current?.close} size={props?.size ?? 'xs'} keyboard={false}>
            <Modal.Header><div className='font-semibold text-xl'>{props?.title}</div></Modal.Header>
            <Modal.Body>{children}</Modal.Body>
            <Modal.Footer>
                <Button onClick={ref?.current?.close} appearance="subtle"><span className='font-semibold'>Cancel</span></Button>
                <Button onClick={props?.onSubmit} appearance="primary" color='green' loading={props?.processing}><span className='font-semibold'>Submit</span></Button>
            </Modal.Footer>
        </Modal>
    )
})

export default FormModal