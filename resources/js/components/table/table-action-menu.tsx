import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { LucideIcon, MoreHorizontal } from "lucide-react"
import React from "react"

type tableActionMenuProps = {
    items: {
        label: string,
        onClick: () => void
        icon?: LucideIcon | null
    }[]
}

export default function ActionMenu({ items }: tableActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={item.onClick}>
                            <span>{item.icon && <item.icon size={32} />}</span>
                            {item.label}
                        </DropdownMenuItem>
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
