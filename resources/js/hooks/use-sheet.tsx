import { create } from 'zustand';

type SheetStore = {
    isOpen: boolean;
    openSheet: () => void;
    closeSheet: () => void;
};

export const useSheetStore = create<SheetStore>((set) => ({
    isOpen: false,
    openSheet: () => set({ isOpen: true }),
    closeSheet: () => set({ isOpen: false }),
}));