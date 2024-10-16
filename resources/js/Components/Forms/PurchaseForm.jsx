import React, { useRef, useState } from 'react'
import FormDrawer from '@/Components/Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { DatePicker, HStack, Input, InputGroup, SelectPicker } from 'rsuite'
import { SearchIcon } from 'lucide-react'
import ProductTable from '@/Components/Table/ProductTable'
import { useDispatch, useSelector } from 'react-redux'
import { setDiscount, setPurchaseProduct, setShipping, setTax } from '@/Store/Reducers/PurchaseProductSlice'
import { formattedNumber } from '@/Lib/Utils'
import { paymentMethods, purchaseStatus } from '@/Lib/Constants'


const PurchaseForm = (props) => {

    const { drawerRef, selected, suppliers } = props
    const searchRef = useRef(null)
    const [searchItems, setSearchItems] = useState([])
    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        tax: 0,
        discount: 0,
        shipping: 0
    })
    const { products, total, taxPercent, taxAmount, discount, shipping } = useSelector(state => state.purchaseProductSlice)
    const dispatch = useDispatch()

    const handleSearch = async (value) => {
        if (value.length > 3) {
            const res = await axios.get(route('products.search', {
                'search_qry': value
            }))
            if (res?.data?.length > 0) {
                setSearchItems(res?.data)
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

    const onSubmit = () => { }

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
                        value={'PUR'}
                        onChange={(value) => setData('quantity', value)}
                        className='bg-gray-200'
                    />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Supplier</label>
                    <SelectPicker
                        data={suppliers}
                        className='w-full'
                    />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Purhcase Date</label>
                    <DatePicker
                        className='w-full'
                        placeholder='Select Date'
                        oneTap
                        onChange={(value) => setData('date', value)}
                    />
                </div>
            </HStack>
            <div className="form-item mb-4">
                <ProductTable
                    items={products}
                />
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
                            value={data?.tax}
                            onChange={(value) => {
                                setData('tax', value)
                                dispatch(setTax(value))
                            }}
                        />
                    </InputGroup>
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Discount</label>
                    <InputGroup>
                        <Input
                            value={data?.discount}
                            onChange={(value) => {
                                setData('discount', value)
                                dispatch(setDiscount(value))
                            }}
                        />
                    </InputGroup>
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Shipping</label>
                    <InputGroup>
                        <Input
                            value={data?.shipping}
                            onChange={(value) => {
                                setData('shipping', value)
                                dispatch(setShipping(value))
                            }}
                        />
                    </InputGroup>
                </div>
            </HStack>
            <HStack spacing={20} className='mb-4'>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Status</label>
                    <SelectPicker
                        data={purchaseStatus}
                        className='w-full'
                    />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Payment Method</label>
                    <SelectPicker
                        data={paymentMethods}
                        className='w-full'
                    />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Paid Amount</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
                </div>
            </HStack>
            <div className="form-item mb-4">
                <label className='text-gray-600 font-semibold mb-1 block'>Note (optional)</label>
                <InputGroup>
                    <Input
                        as={"textarea"}
                        rows={5}
                    />
                </InputGroup>
            </div>
        </FormDrawer>
    )
}

export default PurchaseForm