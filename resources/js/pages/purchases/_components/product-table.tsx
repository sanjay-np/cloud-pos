import { Trash2Icon } from 'lucide-react';

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

import { type ProductStoreState, useProductStore } from '@/hooks/use-product';

export const ProductTable = () => {

    const columns = ['SN.', 'Product Name', 'QTY', 'Price', 'Total', '...']
    const {
        products,
        total,
        taxAmount,
        discount,
        shipping,
        grandTotal,
        changeQty,
        changePrice,
        removeProduct
    }: ProductStoreState = useProductStore();

    return (
        <>
            <div className="product-table rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((item, index) => (
                                <TableHead key={index}>{item}</TableHead>
                            ))}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {products.length > 0
                            ? (
                                products.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{item.title}</TableCell>
                                        <TableCell>
                                            <Input
                                                type='number'
                                                value={item.qty}
                                                onChange={(e) => changeQty(item.id, parseInt(e.target.value))}
                                                className='w-16'
                                                min={1}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Input
                                                value={item.price}
                                                onChange={(e) => changePrice(item.id, parseFloat(e.target.value))}
                                                className='w-20'
                                            />
                                        </TableCell>
                                        <TableCell>{(item.price * item.qty).toFixed(2)}</TableCell>
                                        <TableCell>
                                            <Button
                                                size={'icon'}
                                                variant={'outline'}
                                                onClick={() => removeProduct(item.id)}
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
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+) {taxAmount.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Discount</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(-)  {discount.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Shipping</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+)  {shipping.toFixed(2)}</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Grand Total</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(=)  {grandTotal.toFixed(2)}</p>
                    </div>
                </div>
            </div>
        </>
    )
}
