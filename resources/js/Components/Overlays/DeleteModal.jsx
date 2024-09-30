import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal } from 'rsuite'

const DeleteModal = forwardRef((props, ref) => {
    const [isOpen, setIsOpen] = useState(false)
    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
    }))
    return (
        <Modal backdrop="static" role="alertdialog" open={isOpen} onClose={ref?.current?.close} size="xs" keyboard={false}>
            <Modal.Header><div className='font-semibold text-xl'>Delete {props?.title} ?</div></Modal.Header>
            <Modal.Body>This can't be undone.</Modal.Body>
            <Modal.Footer>
                <Button onClick={ref?.current?.close} appearance="subtle"><span className='font-semibold'>Cancel</span></Button>
                <Button onClick={props?.deleteAction} appearance="primary" color='red'><span className='font-semibold'>Delete</span></Button>
            </Modal.Footer>
        </Modal>
    )
})
export default DeleteModal