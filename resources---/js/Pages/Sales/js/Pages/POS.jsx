import CustomerPicker from '@/Components/Picker/CustomerPicker'
import ProductPicker from '@/Components/Picker/ProductPicker'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { setDiscount, setSaleProduct, setShipping, setTax } from '@/Store/Reducers/SaleProductSlice'
import { Head, useForm } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, DatePicker, HStack, Input, InputGroup, SelectPicker } from 'rsuite'
import ProductTable from '../Components/ProductTable'
import InputError from '@/Components/InputError'
import { currency, formattedNumber } from '@/Lib/Utils'
import { SALE_STATUS } from '../Lib/Constants'
import { PAYMENT_METHODS } from '@/Lib/Constants'

export default function POS({ auth }) {
    const { products, total, taxPercent, taxAmount, discount, shipping } = useSelector(state => state.saleProductSlice)
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(),
        customer_id: "",
        tax_percentage: 0,
        tax_amount: 0,
        discount_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
        paid_amount: 0,
        status: "",
        payment_status: "",
        payment_method: "",
        note: "",
        products: []
    })
    const dispatch = useDispatch()

    useEffect(() => {
        setData((prev) => {
            return {
                ...prev,
                products: products,
                tax_percentage: taxPercent,
                tax_amount: taxAmount,
                discount_amount: discount,
                shipping_amount: shipping,
                total_amount: total
            }
        })
    }, [products, total, taxPercent, taxAmount, discount, shipping])

    const handleProductClick = (item) => {
        dispatch(setSaleProduct({ ...item, qty: 1 }))
    }

    const onSubmit = () => {
        post(route('sales.store'), {
            onSuccess: () => {
                drawerRef.current.close()
                toast.success('Success', {
                    description: 'Sales added successfully',
                })
            }
        })
    }

    return (
        <Authenticated user={auth.user}>
            <Head title="Point of Sale" />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>POS</h1>
                        <ul className='breadcrumb'>
                            <li><LayoutGridIcon color='gray' size={20} /></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>Dashboard</span></li>
                            <li><ChevronRightIcon color='gray' size={14} /></li>
                            <li><span>POS</span></li>
                        </ul>
                    </div>
                </div>
                <div className="content-wrapper bg-white rounded-md pb-8">
                    <div className="flex flex-wrap wapper p-4">
                        <div className="w-3/5 pe-2">
                            <ProductPicker handleProductClick={handleProductClick} />
                        </div>
                        <div className="w-2/5">
                            <HStack>
                                <div className="form-item w-1/3">
                                    <InputGroup>
                                        <DatePicker
                                            defaultValue={new Date()}
                                            size='lg'
                                            format='yyyy-MM-dd'
                                            oneTap
                                        />
                                    </InputGroup>
                                </div>
                                <div className="form-item w-2/3">
                                    <CustomerPicker
                                        size='lg'
                                        onChange={(val) => setData('customer_id', val)}
                                    />
                                </div>
                            </HStack>
                        </div>
                    </div>
                    <div className="pt-2">
                        <ProductTable
                            items={products}
                        />
                    </div>
                    <div className="p-4">
                        <div className="form-item mb-4 flex justify-end">
                            <div className="w-1/4">
                                <div className="item flex mb-2">
                                    <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Tax</label>
                                    <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) {currency}{formattedNumber(taxAmount)}</p>
                                </div>
                                <div className="item flex mb-2">
                                    <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Discount</label>
                                    <p className="text-gray-600 font-semibold mb-1 block ml-auto">(-) {currency}{formattedNumber(discount)}</p>
                                </div>
                                <div className="item flex mb-2">
                                    <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Shipping</label>
                                    <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) {currency}{formattedNumber(shipping)}</p>
                                </div>
                                <div className="item flex mb-2">
                                    <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Grand Total</label>
                                    <p className="text-gray-600 font-semibold mb-1 block ml-auto">(=) {currency}{formattedNumber(total)}</p>
                                </div>
                            </div>
                        </div>
                        <HStack spacing={20} className='mb-4'>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Tax (%)</label>
                                <InputGroup>
                                    <Input
                                        defaultValue={data?.tax_percentage}
                                        onChange={(val) => dispatch(setTax(parseFloat(val)))}
                                    />
                                </InputGroup>
                                <InputError message={errors.tax_percentage} className='mt-2' />
                            </div>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Discount</label>
                                <InputGroup>
                                    <Input
                                        defaultValue={data?.discount_amount}
                                        onChange={(val) => dispatch(setDiscount(val))}
                                    />
                                </InputGroup>
                                <InputError message={errors.discount_amount} className='mt-2' />
                            </div>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Shipping</label>
                                <InputGroup>
                                    <Input
                                        defaultValue={data?.shipping_amount}
                                        onChange={(val) => dispatch(setShipping(val))}
                                    />
                                </InputGroup>
                                <InputError message={errors.shipping_amount} className='mt-2' />
                            </div>
                        </HStack>

                        <HStack spacing={20} className='mb-4'>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Status</label>
                                <SelectPicker
                                    data={SALE_STATUS}
                                    className='w-full'
                                    onChange={(val) => setData('status', val)}
                                    searchable={false}
                                />
                                <InputError message={errors.status} className='mt-2' />
                            </div>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Payment Method</label>
                                <SelectPicker
                                    data={PAYMENT_METHODS}
                                    className='w-full'
                                    onChange={(val) => setData('payment_method', val)}
                                    searchable={false}
                                    placement={'auto'}
                                />
                                <InputError message={errors.payment_method} className='mt-2' />
                            </div>
                            <div className="form-item w-1/3">
                                <label className='text-gray-600 font-semibold mb-1 block'>Paid Amount</label>
                                <InputGroup>
                                    <Input
                                        defaultValue={data?.paid_amount}
                                        onChange={(val) => setData('paid_amount', parseFloat(val))}
                                    />
                                </InputGroup>
                                <InputError message={errors.paid_amount} className='mt-2' />
                            </div>
                        </HStack>
                        <div className="form-item mb-4">
                            <label className='text-gray-600 font-semibold mb-1 block'>Note (optional)</label>
                            <InputGroup>
                                <Input
                                    as={"textarea"}
                                    rows={5}
                                    value={data?.note}
                                    onChange={(val) => setData('note', val)}
                                />
                            </InputGroup>
                            <InputError message={errors.note} className='mt-2' />
                        </div>
                        <div className="btn-wrapper text-right">
                            <Button
                                type='submit'
                                color='green'
                                appearance='primary'
                                size='lg'
                                onClick={onSubmit}
                                loading={processing}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}
