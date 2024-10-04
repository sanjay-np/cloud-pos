import React, { useEffect, useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { router, useForm } from '@inertiajs/react'
import axios from 'axios'
import { Input, InputGroup, Loader, SelectPicker, Uploader } from 'rsuite'
import InputError from '@/Components/InputError'
import { AirplayIcon } from 'lucide-react'
import { toast } from 'sonner'
import { previewFile } from '@/Lib/Utils'
import { loadingText } from '@/Lib/Constants'

export default function CategoryForm(props) {

    const { drawerRef, selected, type } = props

    const [loading, setLoading] = useState(false)
    const [logo, setLogo] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null,
        status: '',
        parent_id: 0
    })
    useEffect(() => {
        if (!selected) return;
        if (type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('categories.find', selected));
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
            post(route('categories.store'), {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Category added successfully',
                    })
                }
            })
        } else if (type === 'edit') {
            router.post(route('categories.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    setLogo(null)
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Category updated successfully',
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
            drawerTitle={selected ? "Edit Category" : "Create New Category"}
            reset={formClear}
        >
            {loading ? (
                <Loader center content={loadingText} vertical />
            ) :
                <React.Fragment>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Category Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Category Name..."
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
                                placeholder="Category Description..."
                                as="textarea"
                                rows={3}
                                value={data.description}
                                onChange={e => setData('description', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Parent Category</label>
                        <SelectPicker
                            data={[]}
                            placeholder="Select Parent Category..."
                            className="text-base w-full"
                            value={data.parent_id}
                            onChange={value => setData('parent_id', value)}
                        />
                        <InputError message={errors.parent_id} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Category Logo</label>
                        <Uploader
                            className='category-logo-uploader'
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
                                { value: 'published', label: 'Published' },
                                { value: 'draft', label: 'Draft' }
                            ]}
                            placeholder="Select status..."
                            className="text-base w-full"
                            value={data.status}
                            onChange={value => setData('status', value)}
                            placement="top"
                        />
                        <InputError message={errors.status} className="mt-2" />
                    </div>
                </React.Fragment>
            }
        </FormDrawer>
    )
}
