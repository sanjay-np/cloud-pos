import React from 'react'
import FormDrawer from '../Overlays/FormDrawer'
import { useForm } from '@inertiajs/react'
import { NepaliDatePicker } from 'nepali-datepicker-reactjs'
import "nepali-datepicker-reactjs/dist/index.css"
import { HStack, Input, InputGroup, SelectPicker, Table } from 'rsuite'
import { SearchIcon } from 'lucide-react'


const PurchaseForm = (props) => {

    const { drawerRef, selected } = props
    const { Column, HeaderCell, Cell } = Table;
    const { data, setData, post, processing, errors, reset } = useForm({
        date: ""
    })

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
            <div className="form-item mb-4">
                <InputGroup>
                    <Input
                        placeholder='Search Product by name or code...'
                    />
                    <InputGroup.Addon>
                        <SearchIcon color="gray" strokeWidth={1.5} />
                    </InputGroup.Addon>
                </InputGroup>
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
                        data={[]}
                        className='w-full'
                    />
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Purhcase Date</label>
                    <NepaliDatePicker
                        inputClassName="w-full focus:outline-none"
                        className='border rounded py-1.5 px-3 text-gray-600'
                        value={data?.date}
                        onChange={(value) => setData('date', value)}
                        options={{ calenderLocale: "en", valueLocale: "en" }}
                    />
                </div>
            </HStack>
            <div className="form-item mb-4">
                <Table data={[]} hover bordered cellBordered headerHeight={50}>
                    <Column width={50}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">SN</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column flexGrow={2}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">Product Name</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column width={120}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">Qty</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">P.Price</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">S.Price</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column flexGrow={1}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">Total</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                    <Column width={80}>
                        <HeaderCell><span className="text-base font-semibold text-gray-600">Action</span></HeaderCell>
                        <Cell dataKey='name' />
                    </Column>
                </Table>
            </div>
            <div className="form-item mb-4 flex justify-end">
                <div className="w-1/4">
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Tax</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) 0.00</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Discount</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(-) 0.00</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Shipping</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) 0.00</p>
                    </div>
                    <div className="item flex mb-2">
                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Grand Total</label>
                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(=) 0.00</p>
                    </div>
                </div>
            </div>
            <HStack spacing={20} className='mb-4'>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Tax (%)</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Discount</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Shipping</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
                </div>
            </HStack>
            <HStack spacing={20} className='mb-4'>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Status</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
                </div>
                <div className="form-item w-1/3">
                    <label className='text-gray-600 font-semibold mb-1 block'>Payment Method</label>
                    <InputGroup>
                        <Input />
                    </InputGroup>
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