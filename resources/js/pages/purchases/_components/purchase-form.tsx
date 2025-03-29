import { usePage } from '@inertiajs/react';

import AppSelect from '@/components/app/app-select';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProductFinder } from './product-finder';
import {
    ProductTable,
    setProductHandler
} from '@/components/table/app-product-table';

import { type PurchaseFormFieldProps } from './purchase';

type PurchaseFormProps = {
    data: PurchaseFormFieldProps;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const PurchaseForm = ({ data, setData, errors, isProcessing }: PurchaseFormProps) => {

    const { suppliers } = usePage().props as any

    if (isProcessing) {
        return (
            <div>
                {/* Todo: Add Skeletion */}
                Loading...
            </div>
        )
    }

    return (
        <div className="grid gap-4 px-4">
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Reference</Label>
                    <Input
                        placeholder='Reference...'
                        disabled
                        value={'PUR-000'}
                    />
                </div>
                <div className="item">
                    <Label>Purchase Date</Label>
                    <DatePicker
                        value={data.date ? new Date(data.date) : null}
                        onChange={(date) => setData('date', date ? date.toISOString() : null)}
                    />
                </div>
                <div className="item">
                    <Label>Supplier</Label>
                    <AppSelect
                        placeholder='Select Supplier'
                        options={suppliers ?? []}
                        // @ts-ignore
                        selected={data.supplier_id}
                        onChange={(val) => setData("supplier_id", val)}
                    />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <ProductFinder
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
                    <Label>Purchase Status</Label>
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
                        placeholder='Select Payment Method'
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
                <Label>Purchase Note (Optional)</Label>
                <Textarea
                    placeholder='Purchase Note...'
                    defaultValue={data.note}
                    onChange={(e) => setData('note', e.target.value)}
                />
            </div>
        </div>
    )
}

export default PurchaseForm