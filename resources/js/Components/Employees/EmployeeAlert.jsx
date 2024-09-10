import { useForm } from '@inertiajs/react'
import React from 'react'
import { Button, Modal } from 'rsuite'
import { toast } from 'sonner'

export default function EmployeeAlert(props) {
    const { open, setOpen, selectedEmployee, setSelectedEmployee } = props
    const { delete: destroy } = useForm()
    const handleClose = () => {
        setSelectedEmployee(null)
        setOpen(false)
    }
    const handleDelete = () => {
        destroy(route('employees.destroy', selectedEmployee), {
            onSuccess: () => {
                setOpen(false)
                setSelectedEmployee(null)
                toast.success('Success', {
                    description: 'Employee deleted successfully',
                })
            },
        })
    }
    return (
        <React.Fragment>
            <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs" keyboard={false}>
                <Modal.Header>
                    <div className='font-semibold text-xl'>Are you sure?</div>
                </Modal.Header>
                <Modal.Body>
                    Do you really want to delete this employee? This operation cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        <span className='font-semibold'>Cancel</span>
                    </Button>
                    <Button onClick={handleDelete} appearance="primary" color='red'>
                        <span className='font-semibold'>Confirm</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
