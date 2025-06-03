import React from "react"
import {
    DotsThreeVerticalIcon,
    type Icon
} from '@phosphor-icons/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type tableActionMenuProps = {
    items: {
        label: string,
        onClick: () => void
        icon?: Icon | null
    }[]
}

export default function ActionMenu({ items }: tableActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <DotsThreeVerticalIcon />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="rounded-sm">
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={item.onClick}>
                            <span>
                                {item.icon && (
                                    <item.icon
                                        weight="duotone"
                                        size={32}
                                    />
                                )}
                            </span>
                            {item.label}
                        </DropdownMenuItem>
                    </React.Fragment>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
