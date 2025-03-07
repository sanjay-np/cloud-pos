import FormDrawer from '@/Components/Overlays/FormDrawer'
import InputError from '@/Components/InputError'
import { LOADING_TEXT } from '@/Lib/Constants'
import { router, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { DatePicker, Input, InputGroup, Loader } from 'rsuite'
import { toast } from 'sonner'
import axios from 'axios'

export default function ExpensesForm({ drawerRef, selected, type }) {

    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(),
        title: '',
        description: '',
        amount: '',
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('expenses.show', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [selected])

    const onSubmit = () => {
        if (!selected && type === 'add') {
            setLoading(true)
            post(route('expenses.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Expense added successfully',
                    })
                    setLoading(false)
                }
            })
        }

        if (selected && type === 'edit') {
            setLoading(true)
            router.post(route('expenses.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Expense updated successfully',
                    })
                    setLoading(false)
                }
            })
        }
    }
    const formClear = () => {
        reset()
    }
    return (
        <FormDrawer
            ref={drawerRef}
            onSubmit={onSubmit}
            drawerTitle={selected ? 'Edit Expense' : 'Add Expense'}
            size={'xs'}
            reset={formClear}
        >
            {loading ? <Loader backdrop content={LOADING_TEXT} vertical /> :
                <div className='form-wrapper'>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Expense Date</label>
                        <DatePicker
                            value={data.date}
                            className='w-full'
                            placeholder='Select Date'
                            oneTap
                            onChange={(date) => setData('date', date)}
                        />
                    </div>
                    <div className='form-item mb-4'>
                        <label className="text-gray-600 font-semibold mb-1 block">Expense Name</label>
                        <InputGroup inside>
                            <Input
                                placeholder="Expense Name..."
                                className="text-base"
                                value={data.title}
                                onChange={(value) => setData("title", value)}
                            />
                        </InputGroup>
                        <InputError message={errors.title} className="mt-2" />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Expense Amount</label>
                        <InputGroup inside>
                            <Input
                                placeholder="Expense Amount..."
                                className="text-base"
                                value={data.amount}
                                onChange={(value) => setData("amount", value)}
                            />
                        </InputGroup>
                        <InputError message={errors.amount} className="mt-2" />
                    </div>
                    <div className="form-item mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Expense Description</label>
                        <Input
                            placeholder="Expense Description..."
                            className="text-base"
                            as="textarea"
                            rows={5}
                            value={data.description}
                            onChange={(value) => setData("description", value)}
                        />
                    </div>
                </div>
            }

        </FormDrawer >
    )
}
