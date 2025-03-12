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
import { useSheetStore } from "@/hooks/use-sheet"
import { useForm } from "@inertiajs/react"
import { toast } from "sonner"
import { employeeForm } from "./employee"
import { Textarea } from "@/components/ui/textarea"
import { DatePicker } from "@/components/ui/date-picker"
import AppSelect from "@/components/app/app-select"
import { DEPARTMENT, DOCUMENT_TYPE, EMPLOYEE_STATUS, POSITION } from "./constants"

type employeeDrawerProps = {
    itemId: number | null,
}

export function EmployeeDrawer({ itemId }: employeeDrawerProps) {

    const drawerTitle = itemId != null ? 'Edit' : 'Add'
    const { isOpen, closeSheet } = useSheetStore();

    const { data, setData, post, processing, errors, reset } = useForm<Required<employeeForm>>({
        name: "",
        phone: "",
        address: "",
        joined_at: null,
        department: "",
        position: "",
        document_type: "",
        document_number: "",
        avatar: null,
        document_files: [],
        status: "",
    })

    const handleSubmit = () => {
        if (!itemId) {
            post(route('employees.store'), {
                onFinish: () => {
                    toast.success('Employee created successfully')
                }
            })
        } else {
            post(route('employees.update', itemId), {
                onFinish: () => {
                    toast.success('Employee updated successfully')
                }
            })
        }
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={closeSheet}
        >
            <SheetContent className="sm:max-w-[420px] overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>{drawerTitle} Employee</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 px-4">
                    <div className="grid w-full gap-2">
                        <Label>Employee Name</Label>
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
                            defaultValue={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
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
                        <Label>Joined At</Label>
                        <DatePicker
                            value={data.joined_at ? new Date(data.joined_at) : null}
                            onChange={(date) => setData('joined_at', date ? date.toISOString() : null)}
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label>Department</Label>
                        <AppSelect
                            placeholder="Select Department"
                            options={DEPARTMENT}
                            onChange={(val) => setData('department', val)}
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label>Position</Label>
                        <AppSelect
                            placeholder="Select Position"
                            options={POSITION}
                            onChange={(val) => setData('position', val)}
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label>Identity Document</Label>
                        <AppSelect
                            placeholder="Select Document"
                            options={DOCUMENT_TYPE}
                            onChange={(val) => setData('document_type', val)}
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label>Document Number</Label>
                        <Input
                            type="text"
                            placeholder="123484-2850"
                            defaultValue={data.document_number}
                            onChange={(e) => setData('document_number', e.target.value)}
                        />
                    </div>
                    <div className="grid w-full gap-2">
                        <Label>Status</Label>
                        <AppSelect
                            placeholder="Select Status"
                            options={EMPLOYEE_STATUS}
                            onChange={(val) => setData('status', val)}
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