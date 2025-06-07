import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import { Pagination } from "@/types"
import { AppTableNav } from "@/components/table/app-table-nav";
import { WhenVisible } from "@inertiajs/react";


interface TableProps {
    data: any[];
    columns: ColumnDef<any>[];
    pagination?: Pagination;
    refetch?: string[];
    setMode: any;
    placeholder?: string | null;
    searchRoute: string;
}

export default function AppTable({
    data,
    columns,
    pagination,
    refetch,
    setMode,
    placeholder,
    searchRoute,
}: TableProps) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    const scrolledToEnd = pagination
        ? pagination.current_page >= pagination.last_page
        : false as boolean

    return (
        <div className="w-full">
            <AppTableNav
                setMode={setMode}
                placeholder={placeholder}
                searchRoute={searchRoute}
            />
            <div className="rounded-md border">
                <Table className="border-collapse">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className="border-r border-border last:border-r-0 px-3"
                                            style={{
                                                width: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
                                                minWidth: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
                                                maxWidth: header.getSize() !== 150 ? `${header.getSize()}px` : undefined,
                                            }}
                                        >
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="odd:bg-muted/50 hover:bg-muted/80 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="border-r border-border last:border-r-0 px-3"
                                            style={{
                                                width: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
                                                minWidth: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
                                                maxWidth: cell.column.getSize() !== 150 ? `${cell.column.getSize()}px` : undefined,
                                            }}
                                        >
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center border-r border-border last:border-r-0">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-between space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
                    selected.
                </div>
            </div>
            {pagination && refetch && (
                <WhenVisible
                    fallback={"loading..."}
                    always={!scrolledToEnd}
                    params={{
                        only: [...refetch, 'pagination'],
                        preserveUrl: true,
                        data: {
                            page: pagination.current_page + 1
                        }
                    }}
                >
                    <></>
                </WhenVisible>
            )}
        </div>
    )
}
