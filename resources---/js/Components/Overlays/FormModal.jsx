import { forwardRef, useImperativeHandle, useState } from 'react'
import { Button, Modal } from 'rsuite'

/**
 * FormModal component that renders a modal with a form.
 * 
 * @component
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The content to be displayed inside the modal body.
 * @param {string} [props.title] - The title of the modal.
 * @param {string} [props.size='xs'] - The size of the modal.
 * @param {Function} [props.onSubmit] - The function to be called when the submit button is clicked.
 * @param {boolean} [props.processing] - Indicates if the form is in a processing state.
 * @param {Function} [props.reset] - The function to be called when the modal is closed.
 * @param {React.Ref} ref - The reference object to control the modal's open and close actions.
 * 
 * @returns {JSX.Element} The rendered FormModal component.
 */
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