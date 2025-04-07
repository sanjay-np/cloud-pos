import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type CurrencyFormProps = {
    data: any;
    setData: any
    errors: any,
    isProcessing: boolean
}

const CurrencyForm = ({ data, setData, errors, isProcessing }: CurrencyFormProps) => {


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

            <div className="grid w-full gap-2">
                <Label>Currency Name</Label>
                <Input
                    type="text"
                    placeholder="Nepali Rupee"
                    defaultValue={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
                {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
            </div>

            <div className="grid w-full gap-2">
                <Label>CurrencyLabel</Label>
                <Input
                    type="text"
                    placeholder="NPR"
                    defaultValue={data.label}
                    onChange={(e) => setData('label', e.target.value)}
                />
                {errors.label && <p className="text-red-500 text-xs">{errors.label}</p>}
            </div>

            <div className="grid w-full gap-2">
                <div className="flex items-center justify-between space-x-2">
                    <Label htmlFor="is_default">Make this currency default</Label>
                    <Switch
                        id="is_default"
                        checked={data.is_current}
                        onCheckedChange={(e) => setData('is_current', e.target.checked)}
                    />
                </div>
                {errors.is_current && <p className="text-red-500 text-xs">{errors.is_current}</p>}
            </div>
        </div>
    )
}

export default CurrencyForm
