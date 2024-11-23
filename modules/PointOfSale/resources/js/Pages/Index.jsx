import CustomerPicker from '@/Components/Picker/CustomerPicker'
import ProductPicker from '@/Components/Picker/ProductPicker'
import TableComp from '@/Components/Table/TableComp'
import Authenticated from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { ChevronRightIcon, LayoutGridIcon } from 'lucide-react'
import React from 'react'
import { Button, DatePicker, HStack, Input, InputGroup, Table } from 'rsuite'
import { POINT_OF_SALE_TABLE_COLUMNS } from '../Lib/Constants'
import InputError from '@/Components/InputError'

const Index = ({ auth }) => {
    const { Column, Cell, HeaderCell } = Table
    return (
        <Authenticated user={auth.user}>
            <Head title='Point of Sale' />
            <div className="page-content">
                <div className="top-section">
                    <div className='title-wrapper'>
                        <h1 className='title'>Point of Sale</h1>
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
                            <ProductPicker />
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
                                    <CustomerPicker size='lg' />
                                </div>
                            </HStack>
                            <div className="pt-2">
                                <TableComp
                                    data={[]}
                                    columns={POINT_OF_SALE_TABLE_COLUMNS}
                                    serialize
                                />
                            </div>
                            <div className="form-item mb-4 flex justify-end">
                                <div className="w-1/3">
                                    <div className="item flex mb-2">
                                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Tax</label>
                                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) { }</p>
                                    </div>
                                    <div className="item flex mb-2">
                                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Discount</label>
                                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(-) { }</p>
                                    </div>
                                    <div className="item flex mb-2">
                                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Shipping</label>
                                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(+) { }</p>
                                    </div>
                                    <div className="item flex mb-2">
                                        <label className='text-gray-600 font-semibold mb-1 block w-[150px]'>Grand Total</label>
                                        <p className="text-gray-600 font-semibold mb-1 block ml-auto">(=) { }</p>
                                    </div>
                                </div>
                            </div>
                            <HStack spacing={20} className='mb-4'>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Tax (%)</label>
                                    <InputGroup>
                                        <Input
                                            // defaultValue={data?.tax_percentage}
                                            onChange={(val) => dispatch(setTax(parseFloat(val)))}
                                        />
                                    </InputGroup>
                                    {/* <InputError message={errors.tax_percentage} className='mt-2' /> */}
                                </div>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Discount</label>
                                    <InputGroup>
                                        <Input
                                            // defaultValue={data?.discount_amount}
                                            onChange={(val) => dispatch(setDiscount(val))}
                                        />
                                    </InputGroup>
                                    {/* <InputError message={errors.discount_amount} className='mt-2' /> */}
                                </div>
                                <div className="form-item w-1/3">
                                    <label className='text-gray-600 font-semibold mb-1 block'>Shipping</label>
                                    <InputGroup>
                                        <Input
                                            // defaultValue={data?.shipping_amount}
                                            onChange={(val) => dispatch(setShipping(val))}
                                        />
                                    </InputGroup>
                                    {/* <InputError message={errors.shipping_amount} className='mt-2' /> */}
                                </div>
                            </HStack>
                            <div className="btn-wrapper text-right">
                                <Button type='submit' color='green' appearance='primary' size='lg'>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    )
}

export default Index