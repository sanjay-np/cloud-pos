import React from 'react'
import FormModal from '../Overlays/FormModal'
import { Input, InputGroup } from 'rsuite'

export default function FiscalYearForm(props) {

    const { drawerRef, selected, type } = props

    const onSubmit = () => { }

    return (
        <FormModal
            ref={drawerRef}
            onSubmit={onSubmit}
            title={type === 'add' ? 'Add Fiscal Year' : 'Edit Fiscal Year'}
            size='sm'
        >
            <div className="form-wrapper">
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1'>Label</label>
                    <InputGroup inside>
                        <Input
                            placeholder="Fiscal Year..."
                            className="text-base"
                            type="text"
                        />
                    </InputGroup>
                </div>
            </div>

        </FormModal>
    )
}
