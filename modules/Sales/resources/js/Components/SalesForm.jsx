import { useForm } from '@inertiajs/react'
import { DatePicker, HStack, Input, InputGroup, SelectPicker } from 'rsuite'
import { formattedNumber } from '@/Lib/Utils'
import { useDispatch, useSelector } from 'react-redux'
import CustomerPicker from '@/Components/Picker/CustomerPicker'
import ProductPicker from '@/Components/Picker/ProductPicker'
import { setDiscount, setSaleProduct, setShipping, setTax } from '@/Store/Reducers/SaleProductSlice'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import InputError from '@/Components/InputError'
import ProductTable from './ProductTable'
import { PAYMENT_METHODS } from '@/Lib/Constants'
import { SALE_STATUS } from '../Lib/Constants'
import { useEffect } from 'react'
import { toast } from 'sonner'

export default function SalesForm({ drawerRef, selected, type }) {

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
        if (!selected && type === 'add') {
            post(route('sales.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Sales added successfully',
                    })
                }
            })
        }
    }

    const formClear = () => {
        reset()
    }
    return (
        <FormDrawer
            ref={drawerRef}
            drawerTitle={type === 'add' ? 'Add Sales' : 'Edit Sales'}
            onSubmit={onSubmit}
            processing={processing}
            reset={formClear}
            size='lg'
        >
            <div className="form-item mb-4">
                <ProductPicker
                    handleProductClick={handleProductClick}
                />
            </div>
            <HStack spacing={20} className='mb-4'>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Reference</label>
                    <Input
                        readOnly
                        defaultValue={'CGS-SALE'}
                        className='bg-gray-200'
                    />
                    <InputError message={errors.reference} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Customer</label>
                    <CustomerPicker
                        onChange={(id) => setData('customer_id', id)}
                    />
                    <InputError message={errors.customer_id} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Sale Date</label>
                    <DatePicker
                        value={data.date}
                        className='w-full'
                        placeholder='Select Date'
                        oneTap
                        onChange={(date) => setData('date', date)}
                    />
                    <InputError message={errors.date} className='mt-2' />
                </div>
            </HStack>
            <div className="form-item mb-4">
                <ProductTable
                    items={products}
                />
                <InputError message={errors.products} className='mt-2' />
            </div>
            <div className="form-item mb-4 flex justify-end">
                <div className="w-1/3">
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Tax</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) {formattedNumber(taxAmount)}</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Discount</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(-) {formattedNumber(discount)}</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Shipping</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) {formattedNumber(shipping)}</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Grand Total</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(=) {formattedNumber(total)}</p>
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
                    />
                    <InputError message={errors.status} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Payment Method</label>
                    <SelectPicker
                        data={PAYMENT_METHODS}
                        className='w-full'
                        onChange={(val) => setData('payment_method', val)}
                    />
                    <InputError message={errors.payment_method} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Paid Amount</label>
                    <InputGroup>
                        <Input
                            value={data?.paid_amount}
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
        </FormDrawer>
    )
}