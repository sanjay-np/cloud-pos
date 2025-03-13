import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { Textarea } from "@/components/ui/textarea"
import { useSheetStore } from "@/hooks/use-sheet"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { customerForm } from "./customer"
import AppSelect from "@/components/app/app-select"
import AvatarUpload from "@/components/ui/avatar-upload"
import { validateImageFile } from "@/lib/utils"

type customerDrawerProps = {
    itemId: number | null,
}

export function CustomerDrawer({ itemId }: customerDrawerProps) {

    const drawerTitle = itemId != null ? 'Edit' : 'Add'
    const { isOpen, closeSheet } = useSheetStore();

    const { data, setData, post, errors, processing } = useForm<Required<customerForm>>({
        name: "",
        phone: "",
        email: "",
        address: "",
        whatsapp: "",
        status: "",
        avatar: null,
    })

    const handleSubmit = () => {
        if (!itemId) {
            post(route('customers.store'), {
                onFinish: () => {
                    closeSheet()
                    toast.success('Customer created successfully')
                }
            })
        }
    }

    const handleImageUpload = async (file: File) => {
        const isValid = validateImageFile(file);
        if (!isValid) return;
        setData('avatar', file)
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={closeSheet}
        >
            <SheetContent className="sm:max-w-[420px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{drawerTitle} Customer</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 px-4">
                    <div className="flex w-full gap-4 items-center justify-between mb-2">
                        <div className="text-right">
                            <h2 className="font-semibold text-lg">Customer Profile Picture</h2>
                            <p className="text-muted-foreground text-xs text-center">Upload a profile picture to personalize customer's account</p>
                        </div>
                        <div className="relative">
                            <AvatarUpload
                                onImageUpload={handleImageUpload}
                                fallback="AP"
                                size="lg"
                            />
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
                            options={[
                                {
                                    label: "Active",
                                    value: "active"
                                },
                                {
                                    label: "Inactive",
                                    value: "inactive"
                                }
                            ]}
                            onChange={(val) => setData("status", val)}
                        />
                    </div>
                </div>
                <SheetFooter>
                    <div className="grid grid-cols-2 gap-2">
                        <SheetClose asChild>
                            <Button variant={"outline"}>Close</Button>
                        </SheetClose>
                        <Button
                            variant={"default"}
                            type="submit"
                            onClick={handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
