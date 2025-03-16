"use client"

import * as React from "react"
import { X } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from "@/components/ui/command"

type Tag = {
    id: number
    name: string
}

type TagPickerProps = {
    placeholder?: string
    tags: Tag[]
    selectedTags: Tag[]
    onTagSelect: (tag: Tag) => void
    onTagRemove: (tagId: number) => void
    emptyMessage?: string
}

export function TagPicker({
    placeholder = "Search tags...",
    tags,
    selectedTags,
    onTagSelect,
    onTagRemove,
    emptyMessage = "No tags found.",
}: TagPickerProps) {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const availableTags = React.useMemo(() => {
        return tags.filter((tag) => !selectedTags.some((selectedTag) => selectedTag.id === tag.id))
    }, [tags, selectedTags])

    const filteredTags = React.useMemo(() => {
        // If input is empty, show all available tags
        if (!inputValue) return availableTags

        // Otherwise filter by input text
        return availableTags.filter((tag) => tag.name.toLowerCase().includes(inputValue.toLowerCase()))
    }, [availableTags, inputValue])

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace" && !inputValue && selectedTags.length > 0) {
                onTagRemove(selectedTags[selectedTags.length - 1].id)
            }

            // Close dropdown on escape
            if (e.key === "Escape") {
                setOpen(false)
                inputRef.current?.blur()
            }
        },
        [inputValue, selectedTags, onTagRemove],
    )

    const handleSelect = React.useCallback(
        (value: string) => {
            // Convert the string value to a number
            const numericId = parseInt(value, 10)
            const selectedTag = availableTags.find(tag => tag.id === numericId)

            if (selectedTag) {
                onTagSelect(selectedTag)
                setInputValue("")
                setOpen(false)
                // Blur the input after selection
                inputRef.current?.blur()
            }
        },
        [availableTags, onTagSelect]
    )

    // Handle clicks outside to close the dropdown
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    return (
        <div className="relative" ref={containerRef}>
            <div
                className="flex flex-wrap gap-1.5 p-1.5 border rounded-md min-h-10 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                onClick={() => {
                    inputRef.current?.focus()
                }}
            >
                {selectedTags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="h-7 px-2 text-sm">
                        {tag.name}
                        <button
                            type="button"
                            className="ml-1 rounded-full outline-none focus:ring-2 focus:ring-ring"
                            onMouseDown={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                            }}
                            onClick={() => onTagRemove(tag.id)}
                        >
                            <X className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground" />
                            <span className="sr-only">Remove {tag.name}</span>
                        </button>
                    </Badge>
                ))}

                <input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value)
                        setOpen(true)
                    }}
                    onFocus={() => setOpen(true)}
                    onBlur={(e) => {
                        // Only close if not clicking on a command item
                        if (!e.relatedTarget || !e.relatedTarget.closest(".tag-picker-dropdown")) {
                            // Delay closing to allow for command item clicks
                            setTimeout(() => setOpen(false), 100)
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    className="flex-1 h-7 px-1 py-0 text-sm bg-transparent border-0 outline-none focus:ring-0"
                />
            </div>

            {open && availableTags.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-popover rounded-md border shadow-md tag-picker-dropdown">
                    <Command>
                        <CommandList>
                            {filteredTags.length > 0 ? (
                                <CommandGroup>
                                    {filteredTags.map((tag) => (
                                        <CommandItem
                                            key={tag.id}
                                            value={tag.id.toString()} // Convert number to string for CommandItem
                                            onSelect={handleSelect}
                                            className="gap-2"
                                        >
                                            {tag.name}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            ) : (
                                <CommandEmpty>{emptyMessage}</CommandEmpty>
                            )}
                        </CommandList>
                    </Command>
                </div>
            )}
        </div>
    )
}
