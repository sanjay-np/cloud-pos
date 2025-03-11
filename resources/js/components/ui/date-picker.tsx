import { useState } from "react"
import { format } from "date-fns"
import { Calendar1Icon, CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
    value: Date | null, // Keep this as Date | null
    onChange: (date: Date | null) => void // Accept Date or null
}

export function DatePicker({ value, onChange }: DatePickerProps) {

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon />
                    {value ? format(value, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={value || undefined} // Use undefined instead of null
                    onSelect={(date) => {
                        onChange(date ? date : null);
                    }}
                />
            </PopoverContent>
        </Popover>
    )
}