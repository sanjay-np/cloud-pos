import React, { useEffect, useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { HStack, Input, InputGroup, Loader, Uploader } from 'rsuite'
import { loadingText } from '@/Lib/Constants'
import InputError from '../InputError'
import { previewFile } from '@/Lib/Utils'
import { User2Icon } from 'lucide-react'

export default function CustomerForm(props) {

    const { drawerRef, selected, type } = props
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        phone: '',
        whatsapp: '',
        address: '',
        avatar: null

    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('customers.find', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        }

    }, [selected])

    const onSubmit = () => { }

    const formClear = () => {
        reset()
    }

    return (
        <FormDrawer
            ref={drawerRef}
            processing={false}
            onSubmit={onSubmit}
            drawerTitle={selected ? 'Edit Customer' : 'Add Customer'}
            reset={formClear}
            size={'sm'}
        >
            {loading ? <Loader backdrop content={loadingText} vertical /> :
                <>
                    <HStack spacing={20}>
                        <div className="w-3/4">
                            <div className="form-item mb-4">
                                <label className="text-gray-600 font-semibold mb-1 block">Customer Name</label>
                                <InputGroup inside>
                                    <Input
                                        placeholder="Customer Name..."
                                        className="text-base"
                                        type="text"
                                        autoComplete="name"
                                        value={data.name}
                                        onChange={(value) => setData("name", value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.name} className="mt-2" />
                            </div>
                            <div className="form-item mb-4">
                                <label className="text-gray-600 font-semibold mb-1 block">Phone Number</label>
                                <InputGroup className="form-item mb-4" inside>
                                    <Input
                                        placeholder="Phone Number..."
                                        className="text-base"
                                        type="text"
                                        autoComplete="tel"
                                        value={data.phone}
                                        onChange={(value) => setData("phone", value)}
                                    />
                                </InputGroup>
                                <InputError message={errors.phone} className="mt-2" />
                            </div>
                        </div>
                        <div className="w-1/4">
                            <Uploader
                                className="avatar-uploader"
                                fileListVisible={false}
                                listType="picture"
                                action="/"
                                autoUpload={false}
                                onChange={(file) => {
                                    previewFile(file[0]?.blobFile, (value) => {
                                        setAvatar(value);
                                    });
                                    setData("avatar", file[0]);
                                }}
                            >
                                <button style={{ width: 140, height: 140 }}>
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            width="100%"
                                            height="100%"
                                        />
                                    ) : (
                                        <User2Icon
                                            size={64}
                                            strokeWidth={1.2}
                                            color="gray"
                                        />
                                    )}
                                </button>
                            </Uploader>
                        </div>
                    </HStack>
                    <div className="mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Whats App Number</label>
                        <InputGroup className="form-item mb-4" inside>
                            <Input
                                placeholder="Phone Number..."
                                className="text-base"
                                type="text"
                                autoComplete="tel"
                                value={data.whatsapp}
                                onChange={(value) => setData("whatsapp", value)}
                            />
                        </InputGroup>
                        <InputError message={errors.whatsapp} className="mt-2" />
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-600 font-semibold mb-1 block">Address</label>
                        <InputGroup>
                            <Input
                                as={'textarea'}
                                rows={5}
                                placeholder="Address"
                                value={data.address}
                                onChange={(val) => setData('address', val)}
                            />
                            <InputError message={errors.name} className="mt-2x" />
                        </InputGroup>
                    </div>
                </>
            }

        </FormDrawer >
    )
}
