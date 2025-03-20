import AppSelect from "@/components/app/app-select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/ui/tag-input";
import { Textarea } from "@/components/ui/textarea";

type AttributeFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const AttributeForm = ({ data, setData, errors, isProcessing }: AttributeFormProps) => {

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
                <Label>Attribute Name</Label>
                <Input
                    type="text"
                    placeholder="Color"
                    defaultValue={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                    placeholder="Description"
                    id="description"
                    className="border"
                    defaultValue={data.description}
                    rows={5}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="attribute_values">Options</Label>
                <TagInput
                    onTagsChange={(tags) => setData('attributes', tags)}
                    defaultTags={data.attributes}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Status</Label>
                <AppSelect
                    placeholder="Select Status"
                    selected={data.status}
                    options={[
                        { label: "Active", value: "active" },
                        { label: "Inactive", value: "inactive" }
                    ]}
                    onChange={(val) => setData("status", val)}
                />
            </div>
        </div>
    )
}

export default AttributeForm