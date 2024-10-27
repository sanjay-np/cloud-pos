import React from 'react'
import FormDrawer from '../Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'

export default function SalesForm({ drawerRef, selected, type }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    })

    const onSubmit = () => {

    }

    const formClear = () => {
        reset()
    }
    return (
        <FormDrawer
            ref={drawerRef}
            drawerTitle={type === 'add' ? 'Add Sales' : 'Edit Sales'}
            onSubmit={onSubmit}
            size='sm'
            processing={processing}
            reset={formClear}
        >

        </FormDrawer>
    )
}
