import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { type Pagination } from "@/types";
import { WhenVisible } from "@inertiajs/react";
import { Button } from "../ui/button";
import { AppTableNav } from "./app-table-nav";

interface CustomerTableProps {
    data: any[];
    columns: ColumnDef<any>[];
    pagination?: Pagination;
    refetch?: string[];
    setMode: any;
    placeholder?: string | null;
    searchRoute: string;
}

export default function AppTable({ data, columns, pagination, refetch, setMode, placeholder, searchRoute }: CustomerTableProps) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
    })
    const scrolledToEnd = pagination
        ? pagination.current_page >= pagination.last_page
        : false as boolean

    return (
        <div className="table-wrapper">
            <AppTableNav
                setMode={setMode}
                placeholder={placeholder}
                searchRoute={searchRoute}
            />
            <div className="w-full">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id} className="bg-muted/50 h-10 font-semibold py-3 text-[14px]">
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                        header.column.columnDef.header,
                                                        header.getContext()
                                                    )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length
                                ? (table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                )))
                                : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 flex-auto"
                                        >
                                            <div className="flex flex-col justify-center items-center">
                                                <img src="/icons/not-found-1.png" className="object-fit size-80" />
                                                <div className="pb-6 flex flex-col justify-center items-center gap-2">
                                                    <p className="font-medium text-lg text-muted-foreground">Nothing found... yet!</p>
                                                    <Button>Create New</Button>
                                                </div>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )
                            }
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
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
        </div>
    )
}