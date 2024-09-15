import { router, useForm } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input, InputGroup, Loader, TagPicker } from 'rsuite'
import InputError from '../InputError'
import { toast } from 'sonner'
import axios from 'axios'

export default function SupplierDrawer(props) {
    const { open, setOpen, title, brands, selected, setSelected } = props

    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        address: '',
        contact_person: '',
        pan: '',
        brands: [],
    })

    useEffect(() => {
        if (!selected) return;
        if (title !== 'Edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('suppliers.find', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [selected])


    const handleClose = () => {
        reset()
        setOpen(false)
    }


    const onSubmit = () => {

        if (title === 'Add') {
            post(route('suppliers.store'), {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                    toast.success('Success', {
                        description: 'Supplier added successfully',
                    })
                },
            })
        } else if (title === 'Edit') {
            router.post(route('suppliers.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setOpen(false)
                    setSelected(null)
                    reset()
                    toast.success('Success', {
                        description: 'Supplier updated successfully',
                    })
                },
            })
        }

    }


    return (
        <React.Fragment>
            <Drawer open={open} onClose={handleClose} backdrop="static" size={'xs'} keyboard={false}>
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>{title} Supplier</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={onSubmit} loading={processing}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    {loading ? <Loader center content="fetching" /> :
                        <>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Firm Name</label>
                                <InputGroup>
                                    <Input
                                        placeholder="Firm Name..."
                                        value={data.name}
                                        onChange={(value) => setData('name', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Firm Phone</label>
                                <InputGroup>
                                    <Input
                                        placeholder="Firm Contact..."
                                        value={data.phone}
                                        onChange={(value) => setData('phone', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Contact Person Name </label>
                                <InputGroup>
                                    <Input
                                        placeholder="Contact Person Name..."
                                        value={data.contact_person}
                                        onChange={(value) => setData('contact_person', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.contact_person} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Firm Address </label>
                                <InputGroup>
                                    <Input
                                        placeholder="Firm Address..."
                                        value={data.address}
                                        onChange={(value) => setData('address', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.address} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>PAN Number </label>
                                <InputGroup>
                                    <Input
                                        placeholder="PAN Number..."
                                        value={data.pan}
                                        onChange={(value) => setData('pan', value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.pan} className="mt-2" />
                            </div>
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Supplying Brands </label>
                                <TagPicker
                                    creatable
                                    data={brands}
                                    style={{ width: '100%' }}
                                    onChange={(value) => setData('brands', value)}
                                />
                            </div>
                        </>
                    }
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
