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
import { useSheet } from "@/hooks/use-sheet"
import { useForm } from "@inertiajs/react"

type employeeDrawerProps = {
    itemId: number | null,
}

type employeeForm = {
    name: string,
    phone: string,
    department: string,
    position: string,
    document_type: string,
    document_number: string,
    avatar: null,
    document_files: string[],
    status: string,
}


export function EmployeeDrawer({ itemId }: employeeDrawerProps) {

    const sheetOptions = useSheet()
    const drawerTitle = itemId != null ? 'Edit' : 'Add'

    const { data, setData, post, processing, errors, reset } = useForm<Required<employeeForm>>({
        name: "",
        phone: "",
        department: "",
        position: "",
        document_type: "",
        document_number: "",
        avatar: null,
        document_files: [],
        status: "",
    })

    return (
        <Sheet
            open={sheetOptions.isOpen}
            onOpenChange={sheetOptions.onClose}
        >
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{drawerTitle} Employee</SheetTitle>
                    <SheetDescription>
                        Make changes to your profile here. Click save when you're done.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Username
                        </Label>
                        <Input id="username" value="" className="col-span-3" />
                    </div>
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button
                            type="submit"
                            onClick={sheetOptions.onClose}
                        >
                            Save changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
