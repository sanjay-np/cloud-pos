import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { Modal } from 'rsuite'

/**
 * ViewModal component that renders a modal with a static backdrop and alert dialog role.
 * The modal can be controlled externally using the imperative handle methods `open` and `close`.
 * 
 * @component
 * @param {Object} props - The properties passed to the component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal.
 * @param {string} [props.size='sm'] - The size of the modal.
 * @param {string} [props.title] - The title to be displayed in the modal header.
 * @param {Function} [props.reset] - Optional function to be called when the modal is closed.
 * @param {React.Ref} ref - The reference to control the modal externally.
 * 
 * @example
 * const modalRef = useRef();
 * 
 * const openModal = () => {
 *   modalRef.current.open();
 * };
 * 
 * const closeModal = () => {
 *   modalRef.current.close();
 * };
 * 
 * return (
 *   <div>
 *     <button onClick={openModal}>Open Modal</button>
 *     <ViewModal ref={modalRef} title="My Modal" size="lg">
 *       <p>Modal Content</p>
 *     </ViewModal>
 *   </div>
 * );
 */
const ViewModal = forwardRef(({ children, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    useImperativeHandle(ref, () => ({
        open: () => setIsOpen(true),
        close: () => {
            props?.reset()
            setIsOpen(false)
        },
    }))

    return (
        <Modal backdrop="static" role="alertdialog" open={isOpen} onClose={ref?.current?.close} size={props?.size ?? 'sm'} keyboard={false}>
            <Modal.Header><div className='font-semibold text-xl'>{props?.title}</div></Modal.Header>
            <Modal.Body>{children}</Modal.Body>
        </Modal>
    )
})

export default ViewModal