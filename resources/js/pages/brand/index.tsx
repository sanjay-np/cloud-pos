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
                id: "brand",
                header: "Brand",
                accessorFn: (row) => (
                    <div className="flex gap-3 items-center">
                        <div>

                            <Avatar className={`size-14 transition-colors`}>
                                <AvatarImage
                                    src={row.image_url as string | undefined}
                                    alt="Profile picture"
                                    className="object-cover"
                                />
                                <AvatarFallback className="text-2xl">{"BL"}</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className="">
                            <div className="capitalize text-base">{row.name}</div>
                            <div className="capitalize text-gray-500">{row.description}</div>
                        </div>
                    </div>

                ),
                cell: (info) => info.getValue()
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
