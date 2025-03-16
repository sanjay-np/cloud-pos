import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagPicker } from "@/components/ui/tag-picker";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";


type Brand = {
    id: number
    name: string
}

type SupplierFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
    brands: Brand[]
}

const SupplierForm = ({ data, setData, errors, isProcessing, brands }: SupplierFormProps) => {

    const [selectedTagIds, setSelectedTagIds] = useState<number[]>([])

    const handleTagSelect = (tagId: number) => {
        setSelectedTagIds((prev) => [...prev, tagId])
    }

    const handleTagRemove = (tagId: number) => {
        setSelectedTagIds((prev) => prev.filter((id) => id !== tagId))
    }

    // Get the selected tag names for display in the summary
    const selectedTagNames = selectedTagIds
        .map((id) => brands.find((tag) => tag.id === id)?.name)
        .filter((name): name is string => name !== undefined)


    // const [selectedTags, setSelectedTags] = useState<number[]>([]);

    // const handleTagSelect = (tag: Brand) => {
    //     setSelectedTags((prev) => [...prev, tag.id]);
    // };


    // const handleTagRemove = (tagId: number) => {
    //     setSelectedTags((prev) => prev.filter((id) => id !== tagId));
    // };

    // useEffect(() => { setData('brands', selectedTags) }, [selectedTags])

    // This will hold the selected brand IDs

    // const handleTagSelect = (tag: Brand) => {
    //     setData('brands', [...data.brands, tag.id]);
    // };

    // const handleTagRemove = (tagId: number) => {
    //     setData('brands', data.brands.filter((id: number) => id !== tagId));

    // };

    console.log(data.brands);


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
                <Label>Supplier Name</Label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    defaultValue={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Phone Number</Label>
                <Input
                    type="text"
                    placeholder="+977 9876543210"
                    value={data.phone}
                    onChange={(e) => setData('phone', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>PAN Number</Label>
                <Input
                    type="text"
                    placeholder="9876543210"
                    value={data.pan}
                    onChange={(e) => setData('pan', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Contact Person</Label>
                <Input
                    type="text"
                    placeholder="John Doe"
                    value={data.contact_person}
                    onChange={(e) => setData('contact_person', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea
                    placeholder="Enter Contact Address"
                    id="address"
                    className="border"
                    defaultValue={data.address}
                    onChange={(e) => setData('address', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Brands</Label>
                <TagPicker
                    tags={brands}
                    selectedTags={data?.brands}
                    onTagSelect={handleTagSelect}
                    onTagRemove={handleTagRemove}
                    placeholder="Search for brands..."
                    emptyMessage="No matching brands found"
                />
            </div>
        </div>
    )
}

export default SupplierForm