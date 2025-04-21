import { Head, useForm } from '@inertiajs/react'
import { toast } from 'sonner'

import AppLayout from '@/layouts/app-layout'
import {
    ProductTable,
    setProductHandler
} from '@/components/table/app-product-table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { DatePicker } from '@/components/ui/date-picker'
import AppSelect from '@/components/app/app-select'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { AppProductFinder } from '@/components/app/app-product-finder'

import { type BreadcrumbItem } from '@/types'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Point Of Sale',
        href: '/pos',
    }
]

const POS = () => {
    const { data, setData, post, processing, reset } = useForm({
        date: "",
        products: [],
        customer_id: "",
        tax_percentage: 0,
        tax_amount: 0,
        discount_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
        paid_amount: 0,
        due_amount: 0,
        status: "",
        payment_status: "",
        payment_method: "",
        note: "",
    })

    const handleSubmit = () => {
        post(route('sales.store'), {
            onSuccess: () => {
                toast.success('Sales order created successfully.')
                reset()
            },
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point Of Sale" />
            <div className='grid grid-cols-5 gap-2'>
                <div className='sale-form col-span-3'>
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="item">
                                <Input
                                    placeholder='Reference...'
                                    disabled
                                    value={'SALE-000'}
                                />
                            </div>
                            <div className="item">
                                <DatePicker
                                    value={data.date ? new Date(data.date) : null}
                                    onChange={(date) => setData('date', date ? date.toISOString() : new Date().toISOString())}
                                />
                            </div>
                            <div className="item">
                                <Input
                                    placeholder='Select Customer...'
                                    defaultValue={data.customer_id}
                                    onChange={(e) => setData('customer_id', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid w-full gap-2">
                        <AppProductFinder
                            onProductSelect={(item) => {
                                const productItem = {
                                    id: item.id,
                                    title: item.title,
                                    qty: 1,
                                    price: item.purchase_price
                                }
                                setProductHandler(productItem, data, setData)
                            }}
                        />
                    </div>
                    <div>
                        <ProductTable
                            data={data}
                            setData={setData}
                        />
                    </div>
                    <div className="grid grid-cols-3 w-full gap-2">
                        <div className="item">
                            <Label>Tax (%)</Label>
                            <Input
                                placeholder='10%'
                                defaultValue={data.tax_percentage}
                                onChange={(e) => {
                                    setData('tax_percentage', parseInt(e.target.value))
                                }}
                            />
                        </div>

                        <div className="item">
                            <Label>Discount Amount</Label>
                            <Input
                                placeholder='Rs.200'
                                defaultValue={data.discount_amount}
                                onChange={(e) => {
                                    setData('discount_amount', parseInt(e.target.value))
                                }}
                            />
                        </div>

                        <div className="item">
                            <Label>Shipping Amount</Label>
                            <Input
                                placeholder='Rs.500'
                                defaultValue={data.shipping_amount}
                                onChange={(e) => {
                                    setData('shipping_amount', parseInt(e.target.value))
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-3 w-full gap-2">
                        <div className="item">
                            <Label>Sale Status</Label>
                            <AppSelect
                                placeholder='Select Status'
                                options={[
                                    { label: 'Pending', value: "pending" },
                                    { label: 'Ordered', value: "ordered" },
                                    { label: 'Completed', value: "completed" },
                                ]}
                                selected={data.status}
                                onChange={(val) => setData('status', val)}
                            />
                        </div>

                        <div className="item">
                            <Label>Payment Method</Label>
                            <AppSelect
                                placeholder='Select Method'
                                options={[
                                    { label: 'Cash', value: "cash" },
                                    { label: 'Bank Transfer', value: "bank_transfer" },
                                    { label: 'Cheque', value: "cheque" },
                                    { label: 'Card', value: "card" },
                                    { label: 'Online', value: "online" },
                                    { label: 'UnPaid', value: "unpaid" },
                                ]}
                                selected={data.payment_method}
                                onChange={(val) => setData('payment_method', val)}
                            />
                        </div>

                        <div className="item">
                            <Label>Paid Amount</Label>
                            <Input
                                placeholder='Rs.5000'
                                defaultValue={data.paid_amount}
                                onChange={(e) => setData('paid_amount', parseInt(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="grid w-full gap-2">
                        <Label>Sales Note (Optional)</Label>
                        <Textarea
                            placeholder='Sales Note...'
                            defaultValue={data.note}
                            onChange={(e) => setData('note', e.target.value)}
                        />
                    </div>
                </div>
                <div className="pt-3 text-right">
                    <Button
                        disabled={processing}
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </div>
            </div>
            <div className='col-span-2'>
                {/* TODO: Add Sales Receipt */}
                <div className="receipt-container">
                </div>
            </div>
        </AppLayout >
    )
}

export default POS
