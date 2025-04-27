import * as React from "react"
import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

interface TagInputProps {
    placeholder?: string
    disabled?: boolean
    onTagsChange?: (tags: string[]) => void
    defaultTags?: string[]
}

export function TagInput({
    placeholder = "Type and press space to add a tag...",
    disabled = false,
    onTagsChange,
    defaultTags = [],
}: TagInputProps) {

    const [tags, setTags] = React.useState<string[]>(defaultTags)
    const [inputValue, setInputValue] = React.useState("")
    const inputRef = React.useRef<HTMLInputElement>(null)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if ((e.key === " " || e.key === "Enter") && inputValue.trim()) {
            e.preventDefault()
            addTag(inputValue.trim())
        } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
            // Remove the last tag when backspace is pressed and input is empty
            const newTags = tags.slice(0, -1)
            setTags(newTags)
            onTagsChange?.(newTags)
        }
    }

    const addTag = (tag: string) => {
        if (tag && !tags.includes(tag)) {
            const newTags = [...tags, tag]
            setTags(newTags)
            onTagsChange?.(newTags)
            setInputValue("")
        }
    }

    const removeTag = (tagToRemove: string) => {
        const newTags = tags.filter((tag) => tag !== tagToRemove)
        setTags(newTags)
        onTagsChange?.(newTags)
    }

    const handleContainerClick = () => {
        inputRef.current?.focus()
    }

    return (
        <div
            className="flex flex-wrap gap-2 p-2 border rounded-md focus-within:ring-0 focus-within:ring-ring focus-within:ring-offset-0"
            onClick={handleContainerClick}
        >
            {tags && tags?.map((tag) => (
                <Badge key={tag} variant="secondary" className="gap-1 px-3 py-1">
                    {tag}
                    <button
                        type="button"
                        className="flex items-center justify-center w-4 h-4 rounded-full hover:bg-muted"
                        onClick={() => removeTag(tag)}
                        disabled={disabled}
                    >
                        <X className="w-3 h-3" />
                        <span className="sr-only">Remove {tag}</span>
                    </button>
                </Badge>
            ))}
            <Input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="flex-1 min-w-[120px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 p-0 h-8 shadow-none"
                placeholder={tags.length === 0 ? placeholder : ""}
                disabled={disabled}
            />
        </div>
    )
}
