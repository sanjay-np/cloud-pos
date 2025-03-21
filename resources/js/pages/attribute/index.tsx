import { Head } from '@inertiajs/react';
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import AppSearch from '@/components/app/app-search';
import AppTable from '@/components/table/app-table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

import AttributeOperation from './_components/attribute-operation';

import { useSheetStore } from '@/hooks/use-sheet';
import { useColumns } from '@/hooks/use-columns';

import { type BreadcrumbItem } from '@/types';
import { type AttributeColumnProps, type AttributePageProps } from './_components/attribute';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Attributes',
        href: '/attributes',
    }
];
const Index = ({ attributes, pagination }: AttributePageProps) => {

    const { openSheet } = useSheetStore();
    const { columns, itemId, mode, setMode } = useColumns<AttributeColumnProps>({
        dataKey: "id",
        deleteRoute: "attributes.destroy",
        customColumns: [
            {
                accessorKey: "name",
                header: "Attribute Name",
                cell: ({ row }) => <div className="capitalize font-medium">{row.getValue("name")}</div>
            },
            {
                accessorKey: "attributes",
                header: "Options",
                cell: ({ row }) => {
                    const items = row.getValue("attributes") as string[] | null
                    return (
                        <div className="flex gap-2">
                            {items && items.map((item, index) => <Badge variant={"outline"} key={index}>{item}</Badge>)}
                        </div>
                    )
                }
            },
            {
                accessorKey: "status",
                header: "Status",
                cell: ({ row }) => {
                    const status = (row.getValue("status") as string) === "active" ? "success" : "error";
                    return (
                        <Badge variant={status} className='capitalize'>
                            {row.getValue("status")}
                        </Badge>
                    )
                },
            },
        ]
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Attributes" />
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Attributes..."
                        searchRoute='attributes.index'
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
                    data={attributes}
                    columns={columns}
                    pagination={pagination}
                    refetch={['attributes']}
                />
            </div>
            <AttributeOperation attributeId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index