
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';

export const ProductTable = () => {
    const columns = ['SN.', 'Product Name', 'Quantity', 'Purchase Price', 'Total', '...']
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
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 flex-auto"
                            >
                                <div className="flex justify-center items-center">
                                    <p className='text-muted-foreground font-medium'>No Products Selected Yet...</p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            <div className="form-item mb-4 flex justify-end">
                <div className="grid gap-2">
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Tax</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+) 0.00</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Discount</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(-)  0.00</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Shipping</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(+)  0.00</p>
                    </div>
                    <div className="item flex">
                        <label className='text-muted-foreground font-medium text-sm mb-1 block w-[100px]'>Grand Total</label>
                        <p className="text-muted-foreground font-medium text-sm mb-1 block ml-auto">(=)  0.00</p>
                    </div>
                </div>
            </div>
        </>
    )
}
