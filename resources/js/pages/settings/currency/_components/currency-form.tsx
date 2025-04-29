import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useEffect, useState } from 'react';

type CurrencyFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean;
};

const CurrencyForm = ({ data, setData, errors, isProcessing }: CurrencyFormProps) => {
    const [isDefault, setIsDefault] = useState<boolean>(false);

    const handleToggleChanger = () => {
        setIsDefault(!isDefault);
        setData('is_current', !isDefault);
    };

    useEffect(() => {
        if (data && typeof data.is_current === 'boolean') {
            setIsDefault(data.is_current);
        } else {
            setIsDefault(false); // Fallback if undefined
        }
    }, [data, setData]);

    if (isProcessing) {
        return (
            <div>
                {/* Todo: Add Skeletion */}
                Loading...
            </div>
        );
    }

    return (
        <div className="grid gap-4 px-4">
            <div className="grid w-full gap-2">
                <Label>Currency Name</Label>
                <Input type="text" placeholder="Nepali Rupee" defaultValue={data.name} onChange={(e) => setData('name', e.target.value)} />
                {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="grid w-full gap-2">
                <Label>CurrencyLabel</Label>
                <Input type="text" placeholder="NPR" defaultValue={data.label} onChange={(e) => setData('label', e.target.value)} />
                {errors.label && <p className="text-xs text-red-500">{errors.label}</p>}
            </div>

            <div className="grid w-full gap-2">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="is_default">Make this currency default</Label>
                    <Switch id="is_default" checked={isDefault} onCheckedChange={handleToggleChanger} />
                </div>
                {errors.is_current && <p className="text-xs text-red-500">{errors.is_current}</p>}
            </div>
        </div>
    );
};

export default CurrencyForm;
