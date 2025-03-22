import { DatePicker } from '@/components/ui/date-picker';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type ExpenseFormProps = {
    data: any;
    setData: any;
    errors: any;
    isProcessing: boolean,
}

const ExpenseForm = ({ data, setData, errors, isProcessing }: ExpenseFormProps) => {

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
                <Label>Expense Date</Label>
                <DatePicker
                    value={data.date ? new Date(data.date) : null}
                    onChange={(date) => setData('date', date ? date.toISOString() : null)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Title</Label>
                <Input
                    type="text"
                    placeholder="Office Expense..."
                    defaultValue={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Amount</Label>
                <Input
                    type="text"
                    placeholder="Office Expense..."
                    defaultValue={data.amount}
                    onChange={(e) => setData('amount', e.target.value)}
                />
            </div>
            <div className="grid w-full gap-2">
                <Label>Description</Label>
                <Textarea
                    placeholder="Description..."
                    defaultValue={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />
            </div>
        </div>
    )
}

export default ExpenseForm