import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

type appSelectProps = {
    placeholder: string,
    options: {
        label: string,
        value: string
    }[],
    onChange: (value: string) => void
}

const AppSelect = ({ placeholder, options, onChange, ...props }: appSelectProps) => {
    return (
        <Select onValueChange={onChange}>
            <SelectTrigger {...props}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option, index) => (
                    <SelectItem value={option.value} key={index}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default AppSelect
