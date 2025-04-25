import { Head, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { toast } from 'sonner';

import { AppProductFinder } from '@/components/app/app-product-finder';
import AppSelect from '@/components/app/app-select';
import { ProductTable, setProductHandler } from '@/components/table/app-product-table';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';

import { AppDropdown } from '@/components/app/app-dropdown';
import { type BreadcrumbItem } from '@/types';
import { BarcodeIcon } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Point Of Sale',
        href: '/pos',
    },
];

const POS = ({ customers }: any) => {
    const { data, setData, post, processing, reset } = useForm({
        date: format(new Date(), 'yyyy-MM-dd'),
        products: [],
        customer_id: '',
        tax_percentage: 0,
        tax_amount: 0,
        discount_amount: 0,
        shipping_amount: 0,
        total_amount: 0,
        paid_amount: 0,
        due_amount: 0,
        status: '',
        payment_status: '',
        payment_method: '',
        note: '',
        customer_name: '',
    });

    const handleSubmit = () => {
        post(route('sales.store'), {
            onSuccess: () => {
                toast.success('Sales order created successfully.');
                reset();
            },
        });
    };

    const total = data.products.reduce((sum, product) => sum + product.price * product.qty, 0);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Point Of Sale" />
            <div className="grid grid-cols-5 gap-2">
                <div className="sale-form col-span-3">
                    <div className="grid w-full gap-2">
                        <div className="grid grid-cols-3 gap-2">
                            <div className="item">
                                <Input placeholder="Reference..." disabled value={'SALE-000'} />
                            </div>
                            <div className="item">
                                <DatePicker
                                    value={data.date ? new Date(data.date) : null}
                                    onChange={(date) => setData('date', date ? format(date, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd'))}
                                />
                            </div>
                            <div className="item">
                                <AppDropdown
                                    className="w-full"
                                    placeholder="Search Customer"
                                    initialOptions={customers}
                                    value={data.customer_id}
                                    onChange={(item) => {
                                        setData('customer_id', item.value);
                                        setData('customer_name', item.label);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid w-full gap-2">
                            <AppProductFinder
                                type="sale"
                                onProductSelect={(item) => {
                                    const productItem = {
                                        id: item.id,
                                        title: item.title,
                                        qty: 1,
                                        price: item.sale_price,
                                    };
                                    setProductHandler(productItem, data, setData);
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <ProductTable data={data} setData={setData} />
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2">
                            <div className="item">
                                <Label>Tax (%)</Label>
                                <Input
                                    placeholder="10%"
                                    defaultValue={data.tax_percentage}
                                    onChange={(e) => {
                                        setData('tax_percentage', parseInt(e.target.value));
                                    }}
                                />
                            </div>

                            <div className="item">
                                <Label>Discount Amount</Label>
                                <Input
                                    placeholder="Rs.200"
                                    defaultValue={data.discount_amount}
                                    onChange={(e) => {
                                        setData('discount_amount', parseInt(e.target.value));
                                    }}
                                />
                            </div>

                            <div className="item">
                                <Label>Shipping Amount</Label>
                                <Input
                                    placeholder="Rs.500"
                                    defaultValue={data.shipping_amount}
                                    onChange={(e) => {
                                        setData('shipping_amount', parseInt(e.target.value));
                                    }}
                                />
                            </div>
                        </div>
                        <div className="grid w-full grid-cols-3 gap-2">
                            <div className="item">
                                <Label>Sale Status</Label>
                                <AppSelect
                                    placeholder="Select Status"
                                    options={[
                                        { label: 'Pending', value: 'pending' },
                                        { label: 'Ordered', value: 'ordered' },
                                        { label: 'Completed', value: 'completed' },
                                    ]}
                                    selected={data.status}
                                    onChange={(val) => setData('status', val)}
                                />
                            </div>

                            <div className="item">
                                <Label>Payment Method</Label>
                                <AppSelect
                                    placeholder="Select Method"
                                    options={[
                                        { label: 'Cash', value: 'cash' },
                                        { label: 'Bank Transfer', value: 'bank_transfer' },
                                        { label: 'Cheque', value: 'cheque' },
                                        { label: 'Card', value: 'card' },
                                        { label: 'Online', value: 'online' },
                                        { label: 'UnPaid', value: 'unpaid' },
                                    ]}
                                    selected={data.payment_method}
                                    onChange={(val) => setData('payment_method', val)}
                                />
                            </div>

                            <div className="item">
                                <Label>Paid Amount</Label>
                                <Input
                                    placeholder="Rs.5000"
                                    defaultValue={data.paid_amount}
                                    onChange={(e) => setData('paid_amount', parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="grid w-full gap-2">
                            <Label>Sales Note (Optional)</Label>
                            <Textarea placeholder="Sales Note..." defaultValue={data.note} onChange={(e) => setData('note', e.target.value)} />
                        </div>
                        <div className="pt-3 text-right">
                            <Button disabled={processing} onClick={handleSubmit}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>
                <div className="col-span-2 ps-6">
                    {/* TODO: Add Sales Receipt */}
                    <div className="receipt-container text-muted-foreground border-x-2 border-dashed py-2 font-mono">
                        <div className="border-b-2 border-dashed pb-3 text-center text-xl font-bold">
                            SHOP NAME
                            <span className="block text-center text-base font-normal">Lorem Ipsum Shop Address</span>
                            <span className="block text-center text-base font-normal">+977 1234567890</span>
                        </div>
                        <div className="border-b-2 border-dashed px-3 py-2">
                            <ul>
                                <li className="flex justify-between">
                                    <div>Invoice No: SALE-000</div>
                                    <div>Date: {data.date}</div>
                                </li>
                                <li>Name: {data.customer_name}</li>
                            </ul>
                        </div>
                        <div className="border-b-2 border-dashed px-3 py-2">
                            {data.products.length > 0 &&
                                data.products.map((item, index) => (
                                    <div className="mb-2 flex items-center justify-between">
                                        <div className="product-name">
                                            {item.title}
                                            <span className="block">
                                                {item.qty} X {item.price}
                                            </span>
                                        </div>
                                        <span>{(item.price * item.qty).toFixed(2)}</span>
                                    </div>
                                ))}
                        </div>
                        <div className="border-b-2 border-dashed px-3 py-2">
                            <div className="flex items-center justify-between">
                                <span>Sub Total</span>
                                <span>{total.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Tax</span>
                                <span>{data.tax_amount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Discount</span>
                                <span>{data.discount_amount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Delivery Charge</span>
                                <span>{data.shipping_amount.toFixed(2)}</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <span>Total</span>
                                <span>{data.total_amount.toFixed(2)}</span>
                            </div>
                        </div>
                        <div className="px-2 py-3 text-center text-xl font-bold">
                            THANK YOU
                            <span className="block text-center text-base font-normal">Lorem Ipsum dollar</span>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex">
                                <BarcodeIcon size="56" />
                                <BarcodeIcon size="56" />
                                <BarcodeIcon size="56" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default POS;
