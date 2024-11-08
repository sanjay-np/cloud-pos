import React, { useEffect, useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { router, useForm } from '@inertiajs/react'
import { HStack, Input, InputGroup, InputNumber, Loader, SelectPicker, Uploader } from 'rsuite'
import InputError from '@/Components/InputError'
import { loadingText, productStatus, productType, productUnit } from '@/Lib/Constants'
import { toast } from 'sonner'

export default function ProductForm(props) {

    const { drawerRef, selected, type, brands, suppliers } = props
    const [loading, setLoading] = useState(false)
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        bar_code: '',
        description: '',
        main_image: null,
        gallery_images: [],
        unit_price: '',
        sale_price: '',
        stock_qty: '',
        category_ids: [],
        brand_id: '',
        supplier_id: '',
        tags: '',
        product_type: '',
        unit: '',
        status: '',
    })

    useEffect(() => {
        if (!selected && type !== 'edit') return
        const fetchData = async () => {
            setLoading(true)
            try {
                const res = await axios.get(route('products.find', selected));
                setData(res?.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [selected])

    const onSubmit = () => {
        if (!selected && type === 'add') {
            post(route('products.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Product added successfully',
                    })
                }
            })
        }

        if (selected && type === 'edit') {
            router.post(route('products.update', selected), {
                _method: 'put',
                ...data
            }, {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Product updated successfully',
                    })
                },
            })
        }
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
            size='sm'
        >
            {loading ? <Loader backdrop content={loadingText} vertical /> :
                <>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Product Title</label>
                        <InputGroup>
                            <Input
                                placeholder='Product Title...'
                                value={data.title}
                                onChange={(value) => setData('title', value)}
                            />
                        </InputGroup>
                        <InputError message={errors.title} className='mt-2' />
                    </div>
                    <HStack spacing={12} className='mb-4'>
                        <div className="form-item w-1/2">
                            <label className='text-gray-600 font-semibold mb-1 block'>SKU</label>
                            <InputGroup>
                                <Input
                                    placeholder='SKU...'
                                    defaultValue={data?.sku ?? 'PROD'}
                                    readOnly
                                    className='bg-gray-200'
                                />
                            </InputGroup>
                            <InputError message={errors.sku} className='mt-2' />
                        </div>
                        <div className="form-item w-1/2">
                            <label className='text-gray-600 font-semibold mb-1 block'>Bar Code</label>
                            <InputGroup>
                                <Input
                                    placeholder='Code...'
                                    value={data.bar_code}
                                    onChange={(value) => setData('bar_code', value)}
                                />
                            </InputGroup>
                            <InputError message={errors.bar_code} className='mt-2' />
                        </div>
                    </HStack>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Description</label>
                        <Input
                            as={"textarea"}
                            rows={8}
                            placeholder="Description..."
                            value={data.description}
                            onChange={(value) => setData('description', value)}
                        />
                        <InputError message={errors.description} className='mt-2' />
                    </div>
                    <div className="mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Featured Image</label>
                        <Uploader
                            listType="picture-text"
                            action="/"
                            autoUpload={false}
                            draggable
                            onChange={(file) => {
                                setData("main_image", file[0]);
                            }}
                        >
                            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span>Click or Drag files to this area to upload</span>
                            </div>
                        </Uploader>
                        <InputError message={errors.main_image} className='mt-2' />
                    </div>

                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Gallery Images</label>
                        <Uploader
                            listType='picture-text'
                            action='/'
                            autoUpload={false}
                            draggable
                            onChange={(file) => {
                                setData("gallery_images", file);
                            }}
                        >
                            <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <span>Click or Drag files to this area to upload</span>
                            </div>
                        </Uploader>
                        <InputError message={errors.gallery_images} className='mt-2' />
                    </div>
                    <HStack className='mb-4'>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>Stock Qty</label>
                            <InputGroup>
                                <InputNumber
                                    placeholder='Qty...'
                                    value={data.stock_qty}
                                    onChange={(value) => setData('stock_qty', value)}
                                />
                            </InputGroup>
                        </div>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>Unit Price</label>
                            <InputGroup>
                                <Input
                                    placeholder='Purchase Price...'
                                    value={data.unit_price}
                                    onChange={(value) => setData('unit_price', value)}
                                />
                            </InputGroup>
                        </div>
                        <div className="form-item w-1/3">
                            <label className='text-gray-600 font-semibold mb-1 block'>Selling Price</label>
                            <InputGroup>
                                <Input
                                    placeholder='Selling Price...'
                                    value={data.sale_price}
                                    onChange={(value) => setData('sale_price', value)}
                                />
                            </InputGroup>
                        </div>
                    </HStack>
                    <div className="form-item mb-4">
                        <label className='text-gray-600 font-semibold mb-1 block'>Product Type</label>
                        <SelectPicker
                            className='w-full'
                            data={productType}
                            placement='auto'
                            value={data.product_type}
                            onChange={(value) => setData('product_type', value)}
                            searchable={false}
                        />
                        <InputError message={errors.product_type} className='mt-2' />
                    </div>
                    {/* 
                        Todo: Add Product attributes & product vairations
                    */}
                    <div className="form-item mb-4">
                        <HStack>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Supplier</label>
                                <SelectPicker
                                    className='w-full'
                                    data={suppliers}
                                    value={data.supplier_id}
                                    onChange={(value) => setData('supplier_id', value)}
                                    placement='top'
                                />
                                <InputError message={errors.supplier_id} className='mt-2' />
                            </div>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Brand</label>
                                <SelectPicker
                                    className='w-full'
                                    data={brands}
                                    value={data.brand_id}
                                    onChange={(value) => setData('brand_id', value)}
                                    placement='top'
                                />
                                <InputError message={errors.brand_id} className='mt-2' />
                            </div>
                        </HStack>
                    </div>
                    <div className="form-item mb-4">
                        <HStack>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Unit</label>
                                <SelectPicker
                                    searchable={false}
                                    className='w-full'
                                    data={productUnit}
                                    value={data.unit}
                                    onChange={(value) => setData('unit', value)}
                                    placement='top'
                                />
                                <InputError message={errors.unit} className='mt-2' />
                            </div>
                            <div className="form-item w-1/2">
                                <label className='text-gray-600 font-semibold mb-1 block'>Status</label>
                                <SelectPicker
                                    searchable={false}
                                    className='w-full'
                                    data={productStatus}
                                    value={data.status}
                                    onChange={(value) => setData('status', value)}
                                    placement='top'
                                />
                                <InputError message={errors.status} className='mt-2' />
                            </div>
                        </HStack>
                    </div>
                </>
            }
        </FormDrawer>
    )
}
