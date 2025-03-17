import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

type AppSelectProps = {
    placeholder: string,
    selected?: string | undefined
    options: {
        label: string,
        value: string
    }[] | null,
    onChange: (value: string) => void
}

const AppSelect = ({ placeholder, options, onChange, selected, ...props }: AppSelectProps) => {
    return (
        <Select onValueChange={onChange} defaultValue={selected}>
            <SelectTrigger {...props}>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>

                {options?.length && options.map((option, index) => (
                    <SelectItem value={option.value} key={index}>{option.label}</SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default AppSelect
