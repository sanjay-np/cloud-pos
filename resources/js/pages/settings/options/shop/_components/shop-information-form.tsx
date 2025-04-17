import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';

const ShopInformationForm = () => {
    const { data, setData } = useForm({
        shop_name: '',
        shop_address: '',
        shop_phone: '',
        shop_email: '',
        shop_logo: '',
    });
    return (
        <div className="space-y-4">
            <div className="grid gap-4">
                <Label>Shop Name</Label>
                <Input defaultValue={data.shop_name} placeholder="Enter your shop name" onChange={(e) => setData('shop_name', e.target.value)} />
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
            <div className="grid gap-4">
                <Label>Shop Logo</Label>
                <Input defaultValue={data.shop_logo} placeholder="Enter your shop logo" onChange={(e) => setData('shop_logo', e.target.value)} />
            </div>
        </div>
    );
};

export default ShopInformationForm;
