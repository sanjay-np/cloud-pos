import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import AppSelect from "@/components/app/app-select"
import AvatarUpload from "@/components/ui/avatar-upload"
import { validateImageFile } from "@/lib/utils"

type CustomerFormProps = {
    data: any;
    setData: any
    errors: any,
    isProcessing: boolean
}

const CustomerForm = ({ data, setData, errors, isProcessing }: CustomerFormProps) => {

    const handleImageUpload = async (file: File) => {
        const isValid = validateImageFile(file);
        if (!isValid) return;
        setData('avatar', file)
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
                        fallback="CP"
                        size="lg"
                        initialImage={data?.avatar_url}
                    />
                </div>
                <div className="text-left">
                    <h2 className="font-semibold text-lg">Customer Profile Picture</h2>
                    <p className="text-muted-foreground text-xs">Upload a profile picture to personalize customer's account</p>
                </div>
            </div>
            <div className="grid w-full gap-2">
                <Label>Full Name</Label>
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
                <Label>Whatsapp Number</Label>
                <Input
                    type="text"
                    placeholder="+977 9876543210"
                    value={data.whatsapp}
                    onChange={(e) => setData('whatsapp', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Email Address</Label>
                <Input
                    type="email"
                    placeholder="name@example.com"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label htmlFor="message">Address</Label>
                <Textarea
                    placeholder="Enter Contact Address"
                    id="message"
                    className="border"
                    defaultValue={data.address}
                    onChange={(e) => setData('address', e.target.value)}
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

export default CustomerForm