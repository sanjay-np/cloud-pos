import { create } from 'zustand'

interface Product {
    id: number;
    qty: number;
    price?: number;
}

interface ProductStoreState {
    products: Product[];
    taxPercent: number;
    taxAmount: number;
    discount: number;
    shipping: number;
    total: number;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
    products: [],
    taxPercent: 0,
    taxAmount: 0,
    discount: 0,
    shipping: 0,
    total: 0,
}))