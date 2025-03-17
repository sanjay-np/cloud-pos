import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { router } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button";

export interface dataTableProps {
    data: any[];
    columns: ColumnDef<any>[];
    meta?: {
        current_page?: number,
        first_page_url?: string,
        from?: number,
        next_page_url: string | null,
        path?: string,
        per_page?: number,
        prev_page_url: string | null,
        to?: number,
    };
}

export default function AppTable({ data, columns, meta }: dataTableProps) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableRowSelection: true,
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
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
                                        <div className="flex justify-center">
                                            No results
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
                {meta && (
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (meta.prev_page_url) {
                                    router.visit(meta.prev_page_url || "")
                                }
                            }}
                            disabled={meta.prev_page_url === null}
                            className="cursor-pointer"
                        >
                            <ChevronLeftIcon />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => {
                                if (meta.next_page_url) {
                                    router.visit(meta.next_page_url || "")
                                }
                            }}
                            disabled={meta.next_page_url === null}
                            className="cursor-pointer"
                        >
                            <ChevronRightIcon />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}