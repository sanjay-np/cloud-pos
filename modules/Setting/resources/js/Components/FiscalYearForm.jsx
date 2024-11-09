import React, { useEffect } from 'react'
import FormModal from '@/Components/Overlays/FormModal'
import { Input, InputGroup, Toggle } from 'rsuite'
import { toast } from 'sonner'
import { useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'

export default function FiscalYearForm(props) {

    const { drawerRef, selected, type } = props
    const { data, setData, post, processing, errors, reset, put } = useForm({
        label: '',
        is_current: false,
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            try {
                const res = await axios.get(route('fiscal-years.show', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            }
        }
        fetchData();
    }, [selected])

    const onSubmit = () => {
        if (!selected && type === 'add') {
            post(route('fiscal-years.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Fiscal Year added successfully',
                    })
                }
            })
        }
        if (selected && type === 'edit') {
            put(route('fiscal-years.update', selected), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Fiscal Year updated successfully',
                    })
                },
            })
        }
    }

    return (
        <FormModal
            size='sm'
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            title={type === 'add' ? 'Add Fiscal Year' : 'Edit Fiscal Year'}
            reset={reset}
        >
            <div className="form-wrapper">
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1'>Label</label>
                    <InputGroup inside>
                        <Input
                            placeholder="Fiscal Year..."
                            className="text-base"
                            type="text"
                            value={data.label}
                            onChange={(value) => setData('label', value)}
                        />
                    </InputGroup>
                    <InputError message={errors.label} className="mt-2" />
                </div>
                <div className="form-item mb-4">
                    <label className='text-gray-600 font-semibold mb-1 pe-3'>Is Current</label>
                    <Toggle
                        checked={data.is_current}
                        onChange={(value) => setData('is_current', value)}
                        size={'lg'} color='green'
                    />
                    <InputError message={errors.is_current} className="mt-2" />
                </div>
            </div>
        </FormModal>
    )
}