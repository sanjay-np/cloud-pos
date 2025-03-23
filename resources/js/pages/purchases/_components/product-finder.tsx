import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'

export const ProductFinder = () => {
    return (
        <div className="relative w-full">
            <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute left-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
            >
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>
            <Input
                type='text'
                placeholder='Select/Search a product...'
                className="ps-8"
            />
        </div>
    )
}