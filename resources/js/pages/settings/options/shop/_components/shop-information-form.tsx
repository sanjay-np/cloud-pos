import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

const ShopInformationForm = ({ shopInformation }: any) => {
    const { data, setData, post, errors, processing } = useForm({
        shop_name: shopInformation.shop_name ?? '',
        shop_address: shopInformation.shop_address ?? '',
        shop_phone: shopInformation.shop_phone ?? '',
        shop_email: shopInformation.shop_email ?? '',
        shop_logo: shopInformation.shop_logo ?? '',
    });

    const handleSubmit = () => {
        post(route('options.shopInformation.save'), {
            onSuccess: () => {
                toast.success('Shop Information successfully');
            },
        });
    };

    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                <Label>Shop Name</Label>
                <Input defaultValue={data.shop_name} placeholder="Enter your shop name" onChange={(e) => setData('shop_name', e.target.value)} />
                {errors && <span className="text-danger">{errors.shop_name}</span>}
            </div>

            <div className="grid gap-4">
                <Label>Shop Address</Label>
                <Textarea
                    defaultValue={data.shop_address}
                    placeholder="Enter your shop address"
                    onChange={(e) => setData('shop_address', e.target.value)}
                />
            </div>

            <div className="grid gap-4">
                <Label>Shop Phone</Label>
                <Input defaultValue={data.shop_phone} placeholder="Enter your shop phone" onChange={(e) => setData('shop_phone', e.target.value)} />
            </div>

            <div className="grid gap-4">
                <Label>Shop Email</Label>
                <Input defaultValue={data.shop_email} placeholder="Enter your shop email" onChange={(e) => setData('shop_email', e.target.value)} />
            </div>

            <div className="grid-4">
                <Button onClick={handleSubmit} disabled={processing}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default ShopInformationForm;
