import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { WhenVisible } from "@inertiajs/react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { AppTableNav } from "@/components/table/app-table-nav";

import { type Pagination } from "@/types";

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
        enableColumnResizing: true,
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
                                            <TableHead
                                                key={header.id}
                                                className="px-4 text-sm border-r last:border-r-0 text-foreground font-normal bg-muted/30"
                                            >
                                                {
                                                    header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )
                                                }
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
                                            <TableCell key={cell.id} className="border-r px-4 last:border-r-0">
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
                                            className="h-28 flex-auto"
                                        >
                                            <div className="flex flex-col justify-center items-center">
                                                <img src="/icons/no-items.svg" className="object-fit size-40" />
                                                <div className="pb-6 flex flex-col justify-center items-center gap-2">
                                                    <h2 className="font-medium text-lg">No Data Yet</h2>
                                                    <p className="text-muted-foreground text-center mx-auto ">
                                                        Start by adding your first item to get things going! <br />
                                                        Your data will appear here once it's created.
                                                    </p>
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
        </div >
    )
}
