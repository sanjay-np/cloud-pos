import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type AttributeFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const AttributeForm = ({ data, setData, errors, isProcessing }: AttributeFormProps) => {
    return (
        <div className="grid gap-4 px-4">
            <div className="grid w-full gap-2">
                <Label>Attribute Name</Label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    defaultValue={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </div>
        </div>
    )
}

export default AttributeForm