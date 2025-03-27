import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SaleFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const SaleForm = ({ data, setData, errors, isProcessing }: SaleFormProps) => {
    return (
        <div className="grid gap-4 px-4">
            <div className="grid grid-cols-3 w-full gap-2">
                <div className="item">
                    <Label>Reference</Label>
                    <Input
                        placeholder='Reference...'
                    />
                </div>
            </div>
        </div>
    )
}

export default SaleForm