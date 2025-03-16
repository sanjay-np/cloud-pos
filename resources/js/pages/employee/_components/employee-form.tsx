import AppSelect from '@/components/app/app-select';
import AvatarUpload from '@/components/ui/avatar-upload';
import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { validateImageFile } from '@/lib/utils';
import { DEPARTMENT, DOCUMENT_TYPE, EMPLOYEE_STATUS, POSITION } from './constants';

type EmployeeFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean
}

const EmployeeForm = ({ data, setData, errors, isProcessing }: EmployeeFormProps) => {

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
                        fallback="EP"
                        size="lg"
                        initialImage={data?.avatar_url}
                    />
                </div>
                <div className="text-left">
                    <h2 className="font-semibold text-lg">Employee Profile Picture</h2>
                    <p className="text-muted-foreground text-xs text-left">Upload a profile picture to personalize employees's account</p>
                </div>
            </div>
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
                    selected={data.department}
                    onChange={(val) => setData('department', val)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Position</Label>
                <AppSelect
                    placeholder="Select Position"
                    options={POSITION}
                    selected={data.position}
                    onChange={(val) => setData('position', val)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Identity Document</Label>
                <AppSelect
                    placeholder="Select Document"
                    options={DOCUMENT_TYPE}
                    selected={data.document_type}
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
                    selected={data.status}
                    onChange={(val) => setData('status', val)}
                />
            </div>
        </div>
    )
}

export default EmployeeForm