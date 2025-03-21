import { Head } from "@inertiajs/react";
import {
    FileDownIcon,
    ListFilterIcon,
    Settings2Icon
} from "lucide-react";

import AppLayout from "@/layouts/app-layout";
import AppTable from "@/components/table/app-table";
import { Button } from "@/components/ui/button";
import AppSearch from "@/components/app/app-search";
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar";

import BrandOperation from "./_components/brand-operation";

import { useSheetStore } from "@/hooks/use-sheet";
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

    const { openSheet } = useSheetStore();
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
            <div className="table-wrapper">
                <div className="flex items-center justify-between py-2 gap-2">
                    <AppSearch
                        placeholder="Search Brands..."
                        searchRoute="brands.index"
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
                    data={brands}
                    columns={columns}
                    pagination={pagination}
                    refetch={['brands']}
                />
            </div>
            <BrandOperation brandId={itemId} mode={mode} />
        </AppLayout>
    )
}

export default Index