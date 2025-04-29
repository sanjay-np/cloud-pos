import AppSelect from '@/components/app/app-select';
import AvatarUpload from '@/components/ui/avatar-upload';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { validateImageFile } from '@/lib/utils';
import { ParentCategory } from './category';

type CategoryFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
    parents?: ParentCategory[] | null
}

export const CategoryForm = ({ data, setData, errors, isProcessing, parents }: CategoryFormProps) => {

    const handleImageUpload = async (file: File) => {
        const isValid = validateImageFile(file);
        if (!isValid) return;
        setData('image', file)
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
            <div className="flex w-full gap-4 items-center justify-between mb-2">
                <div className="relative">
                    <AvatarUpload
                        onImageUpload={handleImageUpload}
                        fallback="CI"
                        size="lg"
                        initialImage={data?.image_url}
                    />
                </div>
                <div className="text-left">
                    <h2 className="font-semibold text-lg">Category Icon</h2>
                    <p className="text-muted-foreground text-xs">Upload a profile picture to personalize customer's account</p>
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label>Category Name</Label>
                <Input
                    type="text"
                    placeholder="Electroics"
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
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Parent Category</Label>
                <AppSelect
                    placeholder="Select Parent Category"
                    selected={data.parent_id}
                    options={parents ?? []}
                    onChange={(val) => setData("parent_id", val)}
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