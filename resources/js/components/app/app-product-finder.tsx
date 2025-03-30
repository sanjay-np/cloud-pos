import { useEffect, useState } from 'react'
import { SearchIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useDebouncedCallback } from 'use-debounce'

type Product = {
    id: number,
    title: string,
    purchase_price: number,
    sale_price: number,
}

type ProductFinderProps = {
    onProductSelect?: (item: Product) => void
}

export const AppProductFinder = ({ onProductSelect }: ProductFinderProps) => {

    const [searchResult, setSearchResult] = useState<Product[]>([])
    const [isFocused, setIsFocused] = useState<boolean>(false)
    const [qryText, setQryText] = useState<string>('')

    const fetchProduct = async (searchText: string | null = null) => {
        try {
            const query = searchText ? `?search_qry=${searchText}` : "";
            const res = await fetch(route(`search.product`) + query);
            const response = await res.json();
            if (response) {
                setSearchResult(response);
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleSearch = async (searchText: string) => {
        fetchProduct(searchText)
    };

    const debounced = useDebouncedCallback((value) => {
        setQryText(value);
        handleSearch(value);
    }, 600);


    useEffect(() => {
        fetchProduct();
    }, []);

    const handleOnProductClick = (item: Product) => {
        if (onProductSelect) {
            onProductSelect(item)
        }

        setIsFocused(false)
        setQryText('')
    }

    return (
        <div className="relative w-full">
            <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="absolute left-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-transparent"
            >
                <SearchIcon className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>
            <Input
                type='text'
                placeholder='Select/Search a product...'
                className="ps-8 text-sm"
                onFocus={() => setIsFocused(true)}
                defaultValue={qryText}
                onChange={(e) => debounced(e.target.value)}
            />

            {isFocused && (
                <div className="absolute bg-white w-full z-50 border border-t-0 rounded-md shadow">
                    {searchResult && searchResult?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='py-2 px-4 border-b last:border-b-0 text-sm text-muted-foreground cursor-pointer bg-background hover:bg-muted '
                                onClick={() => handleOnProductClick(item)}
                            >
                                {item.title}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}