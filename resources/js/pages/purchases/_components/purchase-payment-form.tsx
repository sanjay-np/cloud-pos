import { AppModal } from '@/components/app/app-modal';
import AppSelect from '@/components/app/app-select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

type PurchasePaymentFormProps = {
    open: boolean;
    onClose: () => void;
    purchaseId: number | null;
};
export const PurchasePaymentForm = ({ open, onClose, purchaseId }: PurchasePaymentFormProps) => {
    const { data, setData, post } = useForm({
        purchase_id: purchaseId,
        amount: '',
        payment_method: '',
    });

    const handleSubmit = () => {
        if (!purchaseId) return;

        post(route('purchase.payments.store'), {
            onSuccess: () => {
                toast.success('Payment added successfully');
            },
        });
    };

    return (
        <AppModal
            isOpen={open}
            closeModel={onClose}
            title="Add Payment"
            description="Add payment to the selected Purchase"
            handleSubmit={handleSubmit}
        >
            <div className="payment-form grid gap-4">
                <div className="grid gap-2">
                    <Label>Payment Amount </Label>
                    <Input placeholder="Enter Payment Amount" defaultValue={data.amount} onChange={(e) => setData('amount', e.target.value)} />
                </div>
                <AppSelect
                    placeholder="Select Payment Method"
                    options={[
                        { label: 'Cash', value: 'cash' },
                        { label: 'Bank Transfer', value: 'bank_transfer' },
                        { label: 'Cheque', value: 'cheque' },
                        { label: 'Card', value: 'card' },
                        { label: 'Online', value: 'online' },
                    ]}
                    selected={data.payment_method}
                    onChange={(val) => setData('payment_method', val)}
                />
            </div>
        </AppModal>
    );
};
