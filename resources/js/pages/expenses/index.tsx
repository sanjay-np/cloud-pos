import { Head, usePage } from "@inertiajs/react"
import { format } from "date-fns";

import AppLayout from "@/layouts/app-layout"
import AppTable from "@/components/table/app-table"

import ExpenseOperation from "./_components/expense-operation"

import { useColumns } from "@/hooks/use-columns"

import { SharedData, type BreadcrumbItem } from "@/types"
import { formattedNumber } from "@/lib/utils";
import { ExpenseColumnProps, ExpenseIndexProps } from "./_components/expense";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Expenses',
        href: '/expenses',
    }
]

const Index = ({ expenses, pagination }: ExpenseIndexProps) => {

    const { currencySymbol } = usePage<SharedData>().props

    const { columns, itemId, mode, setMode } = useColumns<ExpenseColumnProps>({
        dataKey: "id",
        deleteRoute: "expenses.destroy",
        customColumns: [
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => <div className="capitalize">{format(row.getValue("date"), 'PPP')}</div>,
                size: 130
            },
            {
                accessorKey: "title",
                header: "Title",
                accessorFn: (row) => (
                    <div className="flex flex-col">
                        <div className="capitalize text-base font-medium">{row.title}</div>
                        <div className="text-muted-foreground">{row.description}</div>
                    </div>
                ),
                cell: (info) => info.getValue()
            },
            {
                accessorKey: "amount",
                header: "Amount",
                cell: ({ row }) => <div className="capitalize">{formattedNumber(row.getValue("amount"), currencySymbol)}</div>,
                size: 140
            }
        ]
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
            <AppTable
                data={expenses}
                columns={columns}
                pagination={pagination}
                refetch={['expenses']}
                placeholder="Search Expenses..."
                searchRoute='expenses.index'
                setMode={setMode}
            />
            <ExpenseOperation expenseId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
