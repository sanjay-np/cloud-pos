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

import { useColumns } from './_components/use-columns';
import { AttributePageProps } from './_components/attribute';
import AttributeOperation from './_components/attribute-operation';

import { useSheetStore } from '@/hooks/use-sheet';
import { type BreadcrumbItem } from '@/types';

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

    const { columns, itemId, mode, setMode } = useColumns()
    const { openSheet } = useSheetStore();

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