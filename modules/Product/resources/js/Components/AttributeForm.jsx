import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react'
import { Input, InputGroup, Loader, SelectPicker, TagInput } from 'rsuite';
import InputError from '@/Components/InputError';
import FormDrawer from '@/Components/Overlays/FormDrawer';
import { toast } from 'sonner';
import { loadingText } from '@/Lib/Constants';

export default function AttributeForm(props) {

    const { drawerRef, selected, type } = props;

    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        values: [],
        status: ''
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('attributes.find', selected));
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
        if (!selected && type === "add") {
            post(route('attributes.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Attribute added successfully',
                    })
                }
            })
        }
        if (selected && type === "edit") {
            router.post(route('attributes.update', selected), {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Attribute updated successfully',
                    })
                }
            })
        }
    }

    const formClear = () => {
        reset();
    };

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? "Edit Attribute" : "Create New Attribute"}
            reset={formClear}
        >
            {loading ? <Loader backdrop content={loadingText} vertical /> :
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Attribute Name</label>
                        <InputGroup>
                            <Input
                                placeholder="Attribute Name..."
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
                                placeholder="Attribute Description..."
                                as="textarea"
                                rows={3}
                                value={data.description}
                                onChange={e => setData('description', e)}
                            />
                        </InputGroup>
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Attribute Values</label>
                        <TagInput
                            trigger={['Enter', 'Space', 'Comma']}
                            placeholder="Attributes Values..."
                            onCreate={(value) => {
                                // setData('values', { ...data.values, value })
                            }}
                            style={{ width: '100%', height: 100 }}
                            onClean={() => setData('values', [])}
                        />
                        <InputError message={errors.values} className="mt-2" />
                    </div>
                    <div className='mb-4'>
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
                </>
            }
        </FormDrawer>
    )
}
