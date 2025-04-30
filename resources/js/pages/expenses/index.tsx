import { Head, usePage } from "@inertiajs/react"
import { format } from "date-fns";

import AppLayout from "@/layouts/app-layout"
import AppTable from "@/components/table/app-table"

import ExpenseOperation from "./_components/expense-operation"

import { useColumns } from "@/hooks/use-columns"

import { type BreadcrumbItem } from "@/types"
import { formattedNumber } from "@/lib/utils";

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

const Index = ({ expenses, pagination }: any) => {

    const { default_currency } = usePage().props

    const { columns, itemId, mode, setMode } = useColumns<any>({
        dataKey: "id",
        deleteRoute: "expenses.destroy",
        customColumns: [
            {
                accessorKey: "date",
                header: "Date",
                cell: ({ row }) => <div className="capitalize">{format(row.getValue("date"), 'PPP')}</div>,
            },
            {
                accessorKey: "title",
                header: "Title",
                cell: ({ row }) => <div className="capitalize">{row.getValue("title")}</div>,
            },
            {
                accessorKey: "amount",
                header: "Amount",
                cell: ({ row }) => <div className="capitalize">{`${default_currency} ${formattedNumber(row.getValue("amount"))}`}</div>,
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