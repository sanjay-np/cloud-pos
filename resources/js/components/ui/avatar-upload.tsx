import { useState, useRef } from "react"
import { Camera, Loader2 } from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface AvatarUploadProps {
    initialImage?: string
    onImageUpload?: (file: File) => Promise<void>
    fallback?: string
    size?: "sm" | "md" | "lg" | "xl"
}

export default function AvatarUpload({
    initialImage,
    onImageUpload,
    fallback = "CN",
    size = "md"
}: AvatarUploadProps) {

    const [image, setImage] = useState<string | null>(initialImage || null)
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const sizeClasses = {
        sm: "h-16 w-16",
        md: "h-24 w-24",
        lg: "h-32 w-32",
        xl: "h-40 w-40",
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        try {
            setIsUploading(true)
            const reader = new FileReader()
            reader.onload = (event) => {
                setImage(event.target?.result as string)
            }
            reader.readAsDataURL(file)
            if (onImageUpload) {
                await onImageUpload(file)
            }
        } catch (error) {
            console.error("Error uploading image:", error)
        } finally {
            setIsUploading(false)
        }
    }

    const triggerFileInput = () => {
        fileInputRef.current?.click()
    }

    return (
        <div className="relative group">
            <Avatar className={`${sizeClasses[size]} border-2 border-dashed group-hover:border-primary transition-colors`}>
                <AvatarImage
                    src={image || undefined}
                    alt="Profile picture"
                    className="object-cover"
                />
                <AvatarFallback className="text-2xl">{fallback}</AvatarFallback>
            </Avatar>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
            />

            <Button
                size="icon"
                variant="secondary"
                className="absolute bottom-0 right-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={triggerFileInput}
                disabled={isUploading}
            >
                {isUploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
            </Button>
        </div>
    )
}

