import { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

import AppSelect from '@/components/app/app-select';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProductTable } from './product-table';
import { ProductFinder } from './product-finder';

import {
    type ProductStoreState,
    useProductStore
} from '@/hooks/use-product';

type PurchaseFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const PurchaseForm = ({ data, setData, errors, isProcessing }: PurchaseFormProps) => {

    const {
        products,
        grandTotal,
        taxPercent,
        taxAmount,
        discount,
        shipping,
        setProduct,
        setTax,
        setDiscount,
        setShipping
    }: ProductStoreState = useProductStore();

    const { suppliers } = usePage().props as any

    const onProductSelect = (item: any) => {
        setProduct({
            id: item.id,
            title: item.title,
            qty: 1,
            price: item.purchase_price
        })
    }

    useEffect(() => {
        // @ts-ignore
        setData((prev) => {
            return {
                ...prev,
                products: products,
                tax_percentage: taxPercent,
                tax_amount: taxAmount,
                discount_amount: discount,
                shipping_amount: shipping,
                total_amount: grandTotal
            }
        })
    }, [products, grandTotal, taxPercent, taxAmount, discount, shipping])

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
                        selected={data.supplier_id}
                        onChange={(val) => setData("supplier_id", val)}
                    />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <ProductFinder onProductSelect={onProductSelect} />
                <ProductTable items={data.products} />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Tax (%)</Label>
                    <Input
                        placeholder='10%'
                        defaultValue={data.tax_percentage}
                        onChange={(e) => {
                            setTax(parseInt(e.target.value))
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
                            setDiscount(parseInt(e.target.value))
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
                            setShipping(parseInt(e.target.value))
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