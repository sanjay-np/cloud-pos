import React from "react"
import * as PhosphorIcons from '@phosphor-icons/react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import Icon from "@/components/ui/icon"

type tableActionMenuProps = {
    items: {
        label: string,
        onClick: () => void
        icon?: keyof typeof PhosphorIcons | null
    }[]
}

export default function ActionMenu({ items }: tableActionMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <Icon
                        name="DotsThreeVerticalIcon"
                    />
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
                                    <Icon
                                        name={item.icon}
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
