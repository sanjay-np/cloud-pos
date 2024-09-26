import React from 'react'
import { Modal } from 'rsuite'

export default function DeleteAlert(props) {
    return (
        <React.Fragment>
            <Modal backdrop="static" role="alertdialog" open={props?.visible} onClose={props?.setVisible} size="xs" keyboard={false}>
                <Modal.Header>
                    <div className='font-semibold text-xl'>Delete {props?.title} ?</div>
                </Modal.Header>
                <Modal.Body>
                    This can't be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props?.setVisible} appearance="subtle">
                        <span className='font-semibold'>Cancel</span>
                    </Button>
                    <Button onClick={props?.handleDelete} appearance="primary" color='red'>
                        <span className='font-semibold'>Delete</span>
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    )
}
