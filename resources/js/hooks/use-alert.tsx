import { create } from 'zustand';

type AlertStore = {
    isOpen: boolean;
    onConfirm: (() => void) | null;
    openAlert: (onConfirm: () => void) => void;
    closeAlert: () => void;
}

export const useAlertStore = create<AlertStore>((set) => ({
    isOpen: false,
    onConfirm: null,
    openAlert: (onConfirm: () => void) => set({
        isOpen: true,
        onConfirm
    }),
    closeAlert: () => set({
        isOpen: false,
        onConfirm: null
    })
}))
