import { SearchIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'


type Product = {
    id: number,
    title: string,
    purchase_price: number,
    sale_price: number,
}

type ProductFinderProps = {
    onProductSelect?: (item: Product) => void
}

const ProductFinder = ({ onProductSelect }: ProductFinderProps) => {

    const [searchResult, setSearchResult] = useState<any[]>([])
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
        setQryText('')
    }

    return (
        <div className='relative w-full grid gap-2'>
            <div className="product-finder col-span-3">
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
                        defaultValue={qryText}
                        onChange={(e) => debounced(e.target.value)}
                    />
                </div>
            </div>
            <div className="product-results col-span-3">
                <div className="grid grid-cols-3 gap-3">
                    {searchResult && searchResult?.map((item, index) => (
                        <Card key={index} className='shadow-none rounded-md pt-0 pb-2 gap-3'>
                            <div className="flex items-center justify-center border-b bg-muted">
                                <img src="/icons/default-product-1.png" alt='product' className='size-36 scale-150' />
                            </div>
                            <CardHeader className='px-4 py-0'>
                                <CardTitle className='py-0 truncate'>
                                    <span>{item.title}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='px-4'>
                                <span>${parseFloat(item.sale_price).toFixed(2)}</span>
                            </CardContent>
                            <CardFooter className='px-4'>
                                <Button
                                    variant="outline"
                                    size={"sm"}
                                    onClick={() => handleOnProductClick(item)}
                                >
                                    <span>Add to cart</span>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProductFinder