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

export default function AttributeForm(props) {
    const { drawerRef, selected, type } = props

    const [loading, setLoading] = useState(false)
    const [logo, setLogo] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        code: '',
        type: '',
        is_required: false,
        options: [],
        status: ''
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('brands.show', selected));
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
            post(route('brands.store'), {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Brand added successfully',
                    })
                }
            })
        } else if (type === 'edit') {
            router.post(route('brands.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Brand updated successfully',
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
            drawerTitle={selected ? "Edit Brand" : "Create New Brand"}
            reset={formClear}
        >
            {loading ? (
                <Loader center content={loadingText} vertical />
            ) : (
                <>
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
                        <label className='text-gray-600 font-semibold mb-1 block'>Website</label>
                        <InputGroup>
                            <Input
                                placeholder="Brand Website..."
                                value={data.website}
                                onChange={e => setData('website', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Country</label>
                        <InputGroup>
                            <Input
                                placeholder="Country of Origin..."
                                value={data.country}
                                onChange={e => setData('country', e)}
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
                                previewFile(file[0]?.blobFile, value => {
                                    setLogo(value);
                                });
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