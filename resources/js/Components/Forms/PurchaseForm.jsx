import React, { useEffect, useRef, useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { DatePicker, HStack, Input, InputGroup, SelectPicker } from 'rsuite'
import { SearchIcon } from 'lucide-react'
import ProductTable from '@/Components/Table/ProductTable'
import { useDispatch, useSelector } from 'react-redux'
import { setDiscount, setPurchaseProduct, setShipping, setTax } from '@/Store/Reducers/PurchaseProductSlice'
import { formattedNumber } from '@/Lib/Utils'
import { paymentMethods, purchaseStatus } from '@/Lib/Constants'
import { toast } from 'sonner'
import InputError from '@/Components/InputError'


const PurchaseForm = ({ drawerRef, selected, suppliers, type }) => {

    const searchRef = useRef(null)
    const [searchItems, setSearchItems] = useState([])
    const { products, total, taxPercent, taxAmount, discount, shipping } = useSelector(state => state.purchaseProductSlice)
    const { data, setData, post, processing, errors, reset } = useForm({
        date: new Date(),
        supplier_id: "",
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

    const handleSearch = async (value) => {
        if (value.length > 3) {
            try {
                const res = await axios.get(route('products.search', { search_qry: value }));
                setSearchItems(res.data.length ? res.data : []);
            } catch (error) {
                console.error("Search error:", error);
                setSearchItems([]);
            }
        } else {
            setSearchItems([])
        }
    }

    const onClickSearchItem = (item) => {
        dispatch(setPurchaseProduct({ ...item, qty: 1 }))
        setSearchItems([])
        if (!searchRef.current) return
        searchRef.current.value = ''
    }

    const onSubmit = () => {
        if (!selected && type === 'add') {
            post(route('purchases.store'), {
                onSuccess: () => {
                    drawerRef.current.close()
                    toast.success('Success', {
                        description: 'Purchase added successfully',
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
            processing={processing}
            onSubmit={onSubmit}
            drawerTitle={selected ? 'Edit Purchase' : 'Add Purchase'}
            reset={formClear}
            size='lg'
        >
            <div className="form-item mb-4 relative">
                <InputGroup>
                    <Input
                        placeholder='Search Product by name or code...'
                        size='md'
                        ref={searchRef}
                        onChange={(val) => handleSearch(val)}
                    />
                    <InputGroup.Addon>
                        <SearchIcon color="gray" strokeWidth={1.5} />
                    </InputGroup.Addon>
                </InputGroup>
                {searchItems.length > 0 && (
                    <div className="search-result absolute z-10 w-full bg-white top-11 border-x px-2">
                        <ul>
                            {searchItems.map((item, index) => (
                                <li className="item border-b py-2 cursor-pointer" key={index}>
                                    <div className='flex items-center justify-between' onClick={() => onClickSearchItem(item)}>
                                        <p>{item.title}</p>
                                        <p>{item.sku}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <HStack spacing={20} className='mb-4'>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Reference</label>
                    <Input
                        readOnly
                        defaultValue={'CGS-PUR'}
                        className='bg-gray-200'
                    />
                    <InputError message={errors.reference} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Supplier</label>
                    <SelectPicker
                        data={suppliers}
                        className='w-full'
                        onChange={(val) => setData('supplier_id', val)}
                    />
                    <InputError message={errors.supplier_id} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Purhcase Date</label>
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
                        data={purchaseStatus}
                        className='w-full'
                        onChange={(val) => setData('status', val)}
                    />
                    <InputError message={errors.status} className='mt-2' />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Payment Method</label>
                    <SelectPicker
                        data={paymentMethods}
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

export default PurchaseForm