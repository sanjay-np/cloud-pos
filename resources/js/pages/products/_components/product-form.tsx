import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TagPicker } from "@/components/ui/tag-picker";
import { Textarea } from "@/components/ui/textarea";


const ProductForm = ({ data, setData, errors, isProcessing, brands }: any) => {

    const [selectedBrands, setSelectedBrands] = useState<number[]>(data?.brands ?? [])

    useEffect(() => {
        setData('brands', selectedBrands)
    }, [selectedBrands])

    useEffect(() => {
        setSelectedBrands(data?.brands);
    }, [data?.brands])

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
                    tags={brands ?? []}
                    selectedTagIds={selectedBrands}
                    setSelectedTagIds={setSelectedBrands}
                    placeholder="Search for brands..."
                    emptyMessage="No matching brands found"
                    noTagsMessage="No brands available"
                />
            </div>
        </div>
    )
}

export default ProductForm