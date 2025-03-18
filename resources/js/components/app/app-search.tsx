import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';

import { Input } from '@/components/ui/input'
import { router } from '@inertiajs/react';
import { Button } from '../ui/button';
import { SearchIcon } from 'lucide-react';

interface AppSearchProps {
    placeholder?: string | null;
    searchRoute: string;
}

const AppSearch = ({ placeholder, searchRoute }: AppSearchProps) => {

    const [qryText, setQryText] = useState<string>('')

    const handleSearch = (searchText: string) => {
        if (searchText) {
            router.visit(route(searchRoute), {
                preserveState: true,
                data: {
                    qry: searchText
                }
            })
        } else {
            router.visit(route(searchRoute))
        }
    }

    const debounced = useDebouncedCallback((value) => {
        setQryText(value);
        handleSearch(value)
    }, 600);

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
                placeholder={placeholder ?? ""}
                defaultValue={qryText}
                onChange={(e) => debounced(e.target.value)}
                className="ps-8"
            />
        </div>
    )
}

export default AppSearch