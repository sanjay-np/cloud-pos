import InputError from '@/Components/InputError'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { loadingText } from '@/Lib/Constants'
import { previewFile } from '@/Lib/Utils'
import { router, useForm } from '@inertiajs/react'
import axios from 'axios'
import { AirplayIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Input, InputGroup, Loader, SelectPicker, Uploader } from 'rsuite'
import { toast } from 'sonner'

export default function SupplierForm(props) {
    const { drawerRef, selected, type } = props

    const [loading, setLoading] = useState(false)
    const [logo, setLogo] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        company_name: '',
        email: '',
        phone: '',
        address: '',
        tax_number: '',
        payment_terms: '',
        status: ''
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('suppliers.show', selected));
                setData(res?.data);
                setLogo(res?.data?.image_url);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [selected])

    const onSubmit = () => {
        if (type === 'add') {
            post(route('suppliers.store'), {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Supplier added successfully',
                    })
                }
            })
        } else if (type === 'edit') {
            router.post(route('suppliers.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Supplier updated successfully',
                    })
                },
            })
        }
    }

    const formClear = () => {
        reset();
        setLogo(null);
    }

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? "Edit Supplier" : "Create New Supplier"}
            reset={formClear}
        >
            {loading ? (
                <Loader center content={loadingText} vertical />
            ) : (
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Supplier Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Supplier Name..."
                                value={data.name}
                                onChange={e => setData('name', e)}
                            />
                        </InputGroup>
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Company Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Company Name..."
                                value={data.company_name}
                                onChange={e => setData('company_name', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Email</label>
                        <InputGroup>
                            <Input
                                placeholder="Email..."
                                value={data.email}
                                onChange={e => setData('email', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Phone</label>
                        <InputGroup>
                            <Input
                                placeholder="Phone..."
                                value={data.phone}
                                onChange={e => setData('phone', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Address</label>
                        <InputGroup>
                            <Input
                                placeholder="Address..."
                                value={data.address}
                                onChange={e => setData('address', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Tax Number</label>
                        <InputGroup>
                            <Input
                                placeholder="Tax Number..."
                                value={data.tax_number}
                                onChange={e => setData('tax_number', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Payment Terms</label>
                        <InputGroup>
                            <Input
                                placeholder="Payment Terms..."
                                value={data.payment_terms}
                                onChange={e => setData('payment_terms', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Status</label>
                        <SelectPicker
                            data={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' }
                            ]}
                            placeholder="Select status..."
                            className="text-base w-full"
                            value={data.status}
                            onChange={value => setData('status', value)}
                            placement="top"
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                </>
            )}
        </FormDrawer>
    )
} 