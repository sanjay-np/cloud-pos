import AppSearch from "@/components/app/app-search"
import AppTable from "@/components/table/app-table"
import { Button } from "@/components/ui/button"
import { useColumns } from "@/hooks/use-columns"
import { useSheetStore } from "@/hooks/use-sheet"
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react"
import { format } from "date-fns";
import { FileDownIcon, ListFilterIcon, Settings2Icon } from "lucide-react"
import ExpenseOperation from "./_components/expense-operation"

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
    const { openSheet } = useSheetStore();
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
                cell: ({ row }) => <div className="capitalize">{row.getValue("amount")}</div>,
            }
        ]
    })
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Expenses" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Expenses..."
                        searchRoute='expenses.index'
                    />
                    <div className="flex gap-2">
                        <Button variant={'outline'}>
                            <ListFilterIcon />
                        </Button>
                        <Button variant={'outline'}>
                            <Settings2Icon />
                        </Button>
                        <Button variant={'outline'}>
                            <FileDownIcon />
                        </Button>
                        <Button
                            variant="default"
                            className="ml-auto"
                            onClick={() => {
                                setMode("add")
                                openSheet()
                            }}
                        >
                            Add New
                        </Button>
                    </div>
                </div>
                <AppTable
                    data={expenses}
                    columns={columns}
                    pagination={pagination}
                    refetch={['suppliers']}
                />
            </div>
            <ExpenseOperation expenseId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index