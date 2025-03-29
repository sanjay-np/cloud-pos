import { Trash2Icon } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

// Define types for product and main data structure
type Product = {
    id: number;
    title: string;
    qty: number;
    price: number;
};

type DataState = {
    products: Product[];
    tax_percentage: number;
    tax_amount: number;
    discount_amount: number;
    shipping_amount: number;
    total_amount: number;
};

type ProductTableProps = {
    data: DataState;
    setData: any;
};


export const ProductTable = ({ data, setData }: ProductTableProps) => {

    const columns = ['SN.', 'Product Name', 'Qty', 'Price', 'Total', '...']

    const removeProductHandler = (id: number) => {
        const updatedProducts = data.products.filter(product => product.id !== id);
        setData('products', updatedProducts)
    }


    const changeQtyHandler = (id: number, qty: number) => {
        if (qty < 0) return;
        const updatedProducts = data.products.map(product =>
            product.id === id ? { ...product, qty } : product
        );
        setData('products', updatedProducts)
    }

    const changePriceHandler = (id: number, price: number) => {
        if (!price) return;
        const updatedProducts = data.products.map(product =>
            product.id === id ? { ...product, price } : product
        );
        setData('products', updatedProducts)
    }

    const total = data.products.reduce((sum, product) => sum + (product.price * product.qty), 0);

    useEffect(() => {
        setData('tax_amount', calculateTax(total, data.tax_percentage))
    }, [data.tax_percentage])


    useEffect(() => {
        setData('total_amount', calculateGrandTotal(total, data.tax_amount, data.discount_amount, data.shipping_amount))
    }, [data.discount_amount, data.shipping_amount, data.tax_amount, data.products])

    return (
        <>
            <div className="product-table rounded-md border mb-2">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((item, index) => (
                                <TableHead key={index}>{item}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.products.length > 0
                            ? (
                                data.products.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>
                                            <Input
                                                type='number'
                                                value={item.qty}
                                                onChange={(e) => { changeQtyHandler(item.id, parseInt(e.target.value)) }}
                                                className='w-16'
                                                min={1}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.price}
                                                onChange={(e) => { changePriceHandler(item.id, parseInt(e.target.value)) }}
                                                className='w-20'
                                            />
                                        </TableCell>
                                        <TableCell>{(item.price * item.qty).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button
                                                size={'icon'}
                                                variant={'outline'}
                                                onClick={() => removeProductHandler(item.id)}
                                            >
                                                <Trash2Icon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )))
                            : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 flex-auto">
                                        <div className="flex justify-center items-center">
                                            <p className='text-muted-foreground font-medium'>No Products Selected Yet...</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table >
            </div >
            <div className="form-item mb-4 flex justify-end">
                <div className="grid gap-2">
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Total</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+) {total.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Tax</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+) {data.tax_amount.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Discount</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(-)  {data.discount_amount.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Shipping</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+)  {data.shipping_amount.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Grand Total</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(=)  {data.total_amount.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export const setProductHandler = (item: Product, data: any, setData: any) => {
    //@ts-ignore
    const existingProductIndex = data.products.findIndex(product => product.id === item.id);
    const updatedProducts = [...data.products];

    if (existingProductIndex !== -1) {
        updatedProducts[existingProductIndex] = {
            ...updatedProducts[existingProductIndex],
            qty: updatedProducts[existingProductIndex].qty + item.qty,
        };
    } else {
        updatedProducts.push(item);
    }
    setData('products', updatedProducts)
}


const calculateTax = (subtotal: number, tax: number) => {
    return (subtotal * tax) / 100;
};


const calculateGrandTotal = (subtotal: number, taxAmount: number, discount: number, shipping: number) => {
    const totalWithTax = subtotal + taxAmount;
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};