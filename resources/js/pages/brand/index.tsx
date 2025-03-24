import { Head } from "@inertiajs/react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import BrandOperation from "./_components/brand-operation";

import { useColumns } from "@/hooks/use-columns";

import { type BreadcrumbItem } from "@/types"
import { BrandColumnProps, type BrandIndexProps } from "./_components/brand";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Brands',
        href: '/brands',
    }
]
const Index = ({ brands, pagination }: BrandIndexProps) => {

    const { columns, itemId, mode, setMode } = useColumns<BrandColumnProps>({
        dataKey: "id",
        deleteRoute: "brands.destroy",
        customColumns: [
            {
                accessorKey: "image_url",
                header: "",
                cell: ({ row }) => (
                    <Avatar className={`size-16 border-2 border-dashed group-hover:border-primary transition-colors`}>
                        <AvatarImage
                            src={row.getValue("image_url") as string | undefined}
                            alt="Profile picture"
                            className="object-cover"
                        />
                        <AvatarFallback className="text-2xl">{"BL"}</AvatarFallback>
                    </Avatar>
                )
            },
            {
                header: "Name",
                accessorKey: "name",
                cell: ({ row }) => (
                    <div className="truncate max-w-3xs">{row.getValue("name")}</div>
                )
            },
            {
                header: "Description",
                accessorKey: "description",
                cell: ({ row }) => (
                    <div className="truncate w-96">{row.getValue("description")}</div>
                )
            },
        ]
    })

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Brands" />
            <AppTable
                data={brands}
                columns={columns}
                pagination={pagination}
                refetch={['brands']}
                placeholder="Search Brands..."
                searchRoute="brands.index"
                setMode={setMode}
            />
            <BrandOperation brandId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index