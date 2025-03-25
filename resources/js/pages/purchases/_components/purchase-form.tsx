import AppSelect from '@/components/app/app-select';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ProductTable } from './product-table';
import { ProductFinder } from './product-finder';

type PurchaseFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const PurchaseForm = ({ data, setData, errors, isProcessing }: PurchaseFormProps) => {



    const onProductSelect = (item) => {
        console.log('item', item);

    }

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
                        options={[]}
                        onChange={() => { }}
                    />
                </div>
            </div>
            <div className="grid w-full gap-2">
                <ProductFinder
                    onProductSelect={onProductSelect}
                />
                <ProductTable />
            </div>
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Tax (%)</Label>
                    <Input
                        placeholder='Eg:10'
                    />
                </div>

                <div className="item">
                    <Label>Discount Amount</Label>
                    <Input
                        placeholder='Eg:200'
                    />
                </div>

                <div className="item">
                    <Label>Shipping Amount</Label>
                    <Input
                        placeholder='Eg:500'
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
                        onChange={() => { }}
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
                        onChange={() => { }}
                    />
                </div>

                <div className="item">
                    <Label>Paid Amount</Label>
                    <Input
                        placeholder='Eg:5000'
                    />
                </div>
            </div>

            <div className="grid w-full gap-2">
                <Label>Purchase Note (Optional)</Label>
                <Textarea
                    placeholder='Purchase Note...'
                />
            </div>
        </div>
    )
}

export default PurchaseForm