import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { usePage } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

import { formattedNumber } from '@/lib/utils';
import { SharedData } from '@/types';

type Product = {
    id: number;
    title: string;
    purchase_price: number;
    sale_price: number;
    image_url: string;
};

type ProductFinderProps = {
    onProductSelect?: (item: Product) => void;
    type?: 'sale' | 'purchase';
};

export const AppProductFinder = ({ type, onProductSelect }: ProductFinderProps) => {

    const { currencySymbol } = usePage<SharedData>().props;

    const [searchResult, setSearchResult] = useState<Product[]>([]);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [qryText, setQryText] = useState<string>('');

    const fetchProduct = async (searchText: string | null = null) => {
        try {
            const query = searchText ? `?search_qry=${searchText}` : '';
            const res = await fetch(route(`search.product`) + query);
            const response = await res.json();
            if (response) {
                setSearchResult(response);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleSearch = async (searchText: string) => {
        fetchProduct(searchText);
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
            onProductSelect(item);
        }

        setIsFocused(false);
        setQryText('');
    };

    return (
        <div className="relative w-full">
            <Button
                type="submit"
                size="icon"
                variant="ghost"
                className="text-muted-foreground hover:text-foreground absolute top-0 left-0 h-full px-3 py-2 hover:bg-transparent"
            >
                <Icon name="MagnifyingGlassIcon" className="h-4 w-4" />
                <span className="sr-only">Search</span>
            </Button>
            <Input
                type="text"
                placeholder="Select/Search a product..."
                className="ps-8 text-sm"
                onFocus={() => setIsFocused(true)}
                defaultValue={qryText}
                onChange={(e) => debounced(e.target.value)}
            />

            {isFocused && (
                <div className="absolute z-50 w-full rounded-md border border-t-0 bg-white shadow">
                    {searchResult && searchResult?.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="text-muted-foreground bg-background hover:bg-muted cursor-pointer border-b px-4 py-2 text-sm last:border-b-0"
                                onClick={() => handleOnProductClick(item)}
                            >
                                <div className="flex">
                                    <Avatar className={`size-10 transition-colors`}>
                                        <AvatarImage src={item.image_url as string | undefined} alt="Profile picture" className="object-cover" />
                                        <AvatarFallback className="text-2xl">{'PI'}</AvatarFallback>
                                    </Avatar>

                                    <div className="ml-2">
                                        <div className="text-base font-medium">{item.title}</div>
                                        <span>{type == 'sale' ? formattedNumber(item.sale_price, currencySymbol) : formattedNumber(item.purchase_price, currencySymbol)}</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};
