import React, { useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { HStack, Input, InputGroup, Loader, Uploader } from 'rsuite'
import InputError from '@/Components/InputError'
import { loadingText } from '@/Lib/Constants'
import { FileImage, User2Icon } from 'lucide-react'
import { previewFile } from '@/Lib/Utils'

export default function ProductForm(props) {

    const { drawerRef, selected, type } = props
    const [loading, setLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        image: null
    })

    const onSubmit = () => {

    }

    const formClear = () => {
        reset();
    }

    return (
        <FormDrawer
            ref={drawerRef}
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? 'Edit Product' : 'Add New Product'}
            reset={formClear}
            size='md'
        >
            {loading ? <Loader backdrop content={loadingText} vertical /> :
                <>
                    <HStack spacing={20}>
                        <div className="w-3/4">
                            <div className="mb-4">
                                <label className='text-gray-600 font-semibold mb-1 block'>Product Title</label>
                                <InputGroup>
                                    <Input
                                        placeholder='Product Title...'
                                    />
                                </InputGroup>
                            </div>
                            <HStack spacing={12} className='mb-4'>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>SKU</label>
                                    <InputGroup>
                                        <Input
                                            placeholder='SKU...'
                                        />
                                    </InputGroup>
                                </div>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Code</label>
                                    <InputGroup>
                                        <Input
                                            placeholder='Code...'
                                        />
                                    </InputGroup>
                                </div>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Price</label>
                                    <InputGroup>
                                        <Input
                                            placeholder='Price...'
                                        />
                                    </InputGroup>
                                </div>
                            </HStack>
                        </div>
                        <div className="w-1/4">
                            <Uploader
                                className="full-width-image-uploader"
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
                                <button style={{ width: "100%", height: 200 }}>
                                    {avatar ? (
                                        <img
                                            src={avatar}
                                            width="100%"
                                            height="100%"
                                        />
                                    ) : (
                                        <FileImage
                                            size={64}
                                            strokeWidth={1.2}
                                            color="gray"
                                        />
                                    )}
                                </button>
                            </Uploader>
                        </div>
                    </HStack>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Short Description</label>
                        <Input as={"textarea"} rows={4} placeholder="Short Description..." />
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                        <Input as={"textarea"} rows={8} placeholder="Description..." />
                    </div>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Images</label>
                        <Uploader
                            listType='picture-text'
                            action='/'
                            autoUpload={false}
                            draggable
                            onChange={(file) => {

                            }}
                        >
                            <div style={{
                                height: 200,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <span>
                                    Click or Drag files to this area to upload
                                </span>
                            </div>

                        </Uploader>
                    </div>
                </>
            }
        </FormDrawer>
    )
}
