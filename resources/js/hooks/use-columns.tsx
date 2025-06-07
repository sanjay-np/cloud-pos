import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { router } from "@inertiajs/react";
import { toast } from "sonner";
import * as PhosphorIcons from "@phosphor-icons/react";

import ActionMenu from "@/components/table/table-action-menu";
import { Checkbox } from "@/components/ui/checkbox"

import { useSheetStore } from "@/hooks/use-sheet";
import { useAlertStore } from "@/hooks/use-alert";

import { type Mode } from "@/types";

interface UseColumnsProps<T> {
    dataKey: keyof T;
    deleteRoute?: string;
    customColumns?: ColumnDef<T>[];
    additionalOptions?: {
        label: string,
        onClick: () => void
        icon?: keyof typeof PhosphorIcons | null
    }[];
}

export const useColumns = <T extends Record<string, any>>({
    dataKey,
    deleteRoute,
    customColumns = [],
    additionalOptions = [],
}: UseColumnsProps<T>) => {

    const [itemId, setItemId] = useState<number | null>(null);
    const [mode, setMode] = useState<Mode>(null);

    const { openSheet } = useSheetStore();
    const { openAlert, closeAlert } = useAlertStore();

    const handleDelete = (deleteId: number) => {
        if (deleteId && deleteRoute) {
            router.delete(route(`${deleteRoute}`, deleteId), {
                onSuccess: () => {
                    closeAlert();
                    toast.success("Item deleted successfully");
                },
            });
        }
    };

    const triggerDeleteAlert = (id: number): void => {
        openAlert(() => handleDelete(id));
    };

    const defaultColumns: ColumnDef<T>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
            size: 40,
        },
        ...customColumns,
        {
            header: "Actions",
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const itemId = row.original[dataKey];
                return (
                    <ActionMenu
                        items={[
                            {
                                label: "Edit",
                                icon: "NotePencilIcon",
                                onClick: () => {
                                    setItemId(itemId);
                                    setMode("edit");
                                    openSheet()
                                },
                            },
                            {
                                label: "View",
                                icon: "DeviceTabletSpeakerIcon",
                                onClick: () => {
                                    setItemId(itemId);
                                    setMode("view");
                                    openSheet()
                                },
                            },
                            ...additionalOptions,
                            {
                                label: "Delete",
                                icon: "TrashSimpleIcon",
                                onClick: () => triggerDeleteAlert(itemId),
                            },
                        ]}
                    />
                );
            },
            size: 80,
        },
    ];
    return { itemId, setItemId, mode, setMode, columns: defaultColumns };
};
