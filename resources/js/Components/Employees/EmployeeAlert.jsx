import React from 'react'
import { Button, Modal } from 'rsuite'

export default function EmployeeAlert(props) {
    const { open, setOpen, selectedEmployee, setSelectedEmployee } = props
    const handleClose = () => {
        setSelectedEmployee(null)
        setOpen(false)
    }
    return (
        <React.Fragment>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs" keyboard={false}>
                <Modal.Header>
                    <div className='font-semibold text-xl'>Confirmation</div>
                </Modal.Header>
                <Modal.Body>
                    Are you sure? Do you really want to delete this employee? This operation cannot be reverted back.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        <span className='font-semibold'>Cancel</span>
                    </Button>
                    <Button onClick={handleClose} appearance="primary" color='red'>
                        <span className='font-semibold'>Confirm</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
