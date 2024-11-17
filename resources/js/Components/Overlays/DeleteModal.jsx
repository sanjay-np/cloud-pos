import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal } from 'rsuite'

/**
 * A reusable confirmation modal for delete operations
 * @param {Object} props - Component props
 * @param {string} props.title - The type of item being deleted (e.g. "Customer", "Order")
 * @param {Function} props.deleteAction - Callback function executed when delete is confirmed
 * @param {React.Ref} ref - Forwarded ref that exposes open/close methods
 * @returns {JSX.Element} Delete confirmation modal
 */
const DeleteModal = forwardRef((props, ref) => {
    // Track modal open state
    const [isOpen, setIsOpen] = useState(false)

    // Expose open/close methods through ref
    useImperativeHandle(ref, () => ({
        /**
         * Opens the delete confirmation modal
         */
        open: () => setIsOpen(true),
        /**
         * Closes the delete confirmation modal
         */
        close: () => setIsOpen(false),
    }))

    return (
        // Static backdrop prevents closing by clicking outside
        // Keyboard=false prevents ESC key from closing
        <Modal backdrop="static" role="alertdialog" open={isOpen} onClose={ref?.current?.close} size="xs" keyboard={false}>
            <Modal.Header><div className='font-semibold text-xl'>Delete {props?.title} ?</div></Modal.Header>
            <Modal.Body>This can't be undone.</Modal.Body>
            <Modal.Footer>
                {/* Cancel button closes the modal */}
                <Button onClick={ref?.current?.close} appearance="subtle"><span className='font-semibold'>Cancel</span></Button>
                {/* Delete button triggers the passed in delete action */}
                <Button onClick={props?.deleteAction} appearance="primary" color='red'><span className='font-semibold'>Delete</span></Button>
            </Modal.Footer>
        </Modal>
    )
})

export default DeleteModal