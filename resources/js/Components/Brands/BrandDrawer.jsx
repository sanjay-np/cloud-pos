import { previewFile } from '@/Lib/Utils'
import { router, useForm } from '@inertiajs/react'
import { AirplayIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button, Drawer, Input, InputGroup, Uploader } from 'rsuite'
import InputError from '@/Components/InputError'
import { toast } from 'sonner'
import axios from 'axios'

export default function BrandrDrawer(props) {

    const { open, setOpen, title, selectedBrand, setSelectedBrand } = props
    const [loading, setLoading] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }

    const [logo, setLogo] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null
    })

    useEffect(() => {
        if (!selectedBrand) return;
        if (title !== 'Edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('brands.get', selectedBrand));
                setData(res?.data);
                setLogo(res?.data?.image_url);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [selectedBrand])

    const onSubmit = () => {
        if (title === 'Add') {
            post(route('brands.store'), {
                onSuccess: () => {
                    setLogo(null)
                    setOpen(false)
                    reset()
                    toast.success('Success', {
                        description: 'Brand added successfully',
                    })
                }
            })
        } else if (title === 'Edit') {
            router.post(route('brands.update', selectedBrand), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setOpen(false)
                    setSelectedBrand(null)
                    setLogo(null)
                    reset()
                    toast.success('Success', {
                        description: 'Brand updated successfully',
                    })
                },
            })
        }
    }


    return (
        <React.Fragment>
            <Drawer open={open} onClose={handleClose} backdrop="static" size={'xs'} keyboard={false}>
                <Drawer.Header className='pe-6 items-center'>
                    <Drawer.Title className='font-semibold text-gray-600'>{title} Brand</Drawer.Title>
                    <Drawer.Actions>
                        <Button appearance="primary" color='green' onClick={onSubmit} loading={processing}>
                            <span className='font-semibold'>Submit</span>
                        </Button>
                    </Drawer.Actions>
                </Drawer.Header>
                <Drawer.Body className='p-6'>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Brand Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Brand Name..."
                                value={data.name}
                                onChange={e => setData('name', e)}
                            />
                        </InputGroup>
                        <InputError message={errors.name} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                        <InputGroup>
                            <Input
                                placeholder="Brand Description..."
                                as="textarea"
                                rows={3}
                                value={data.description}
                                onChange={e => setData('description', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Brand Logo</label>
                        <Uploader
                            className='brand-logo-uploader'
                            fileListVisible={false}
                            listType="picture"
                            action="/"
                            autoUpload={false}
                            onChange={file => {
                                previewFile(file[0]?.blobFile, value => { setLogo(value); });
                                setData('image', file[0]);
                            }}
                        >
                            <button style={{ width: 140, height: 140 }}>
                                {logo ? (
                                    <img src={logo} width="100%" height="100%" />
                                ) : (
                                    <AirplayIcon size={64} strokeWidth={1.2} color='gray' />
                                )}
                            </button>
                        </Uploader>
                    </div>
                </Drawer.Body>
            </Drawer>
        </React.Fragment>
    )
}
