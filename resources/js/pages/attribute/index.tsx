import { Head } from '@inertiajs/react';

import AppLayout from '@/layouts/app-layout';
import AppTable from '@/components/table/app-table';
import { Badge } from '@/components/ui/badge';

import AttributeOperation from './_components/attribute-operation';

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

    const { columns, itemId, mode, setMode } = useColumns<AttributeColumnProps>({
        dataKey: "id",
        deleteRoute: "attributes.destroy",
        customColumns: [
            {
                accessorKey: "name",
                header: "Attribute Name",
                size: 150,
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
                size: 150,
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
            <AppTable
                data={attributes}
                columns={columns}
                pagination={pagination}
                refetch={['attributes']}
                placeholder="Search Attributes..."
                searchRoute='attributes.index'
                setMode={setMode}
            />
            <AttributeOperation attributeId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index
