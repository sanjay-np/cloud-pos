import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce';
import { router } from '@inertiajs/react';
import {
    FileDownIcon,
    ListFilterIcon,
    SearchIcon,
    Settings2Icon
} from 'lucide-react';

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';

import { useSheetStore } from '@/hooks/use-sheet';

interface AppTableNavProps {
    setMode: any;
    placeholder?: string | null;
    searchRoute: string;
}

export const AppTableNav = ({ placeholder, searchRoute, setMode }: AppTableNavProps) => {

    const [qryText, setQryText] = useState<string>('')
    const { openSheet } = useSheetStore();

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

    const debounced = useDebouncedCallback((val) => {
        setQryText(val);
        handleSearch(val)
    }, 600);


    return (
        <div className="flex items-center justify-between py-2 gap-2" >
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
            <div className="flex gap-2">
                <Button variant={'outline'}>
                    <ListFilterIcon />
                </Button>
                <Button variant={'outline'}>
                    <Settings2Icon />
                </Button>
                <Button variant={'outline'}>
                    <FileDownIcon />
                </Button>
                <Button
                    variant="default"
                    className="ml-auto"
                    onClick={() => {
                        setMode("add")
                        openSheet()
                    }}
                >
                    Add New
                </Button>
            </div>
        </div >
    )
}
