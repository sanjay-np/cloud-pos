import { create } from 'zustand'

type sheetStore = {
    isOpen: boolean
    onOpen: () => void
    onClose: () => void
}

export const useSheet = create<sheetStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}))