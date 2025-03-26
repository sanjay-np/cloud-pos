import { create } from 'zustand'

interface Product {
    id: number;
    qty: number;
    title: string;
    price: number;
}

export interface ProductStoreState {
    products: Product[];
    taxPercent: number;
    taxAmount: number;
    discount: number;
    shipping: number;
    total: number;
    setProduct: (item: Product) => void;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
    products: [],
    taxPercent: 0,
    taxAmount: 0,
    discount: 0,
    shipping: 0,
    total: 0,

    setProduct: (item: Product) => {
        set((state) => {
            const existingProductIndex = state.products.findIndex(product => product.id === item.id)
            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.products];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    qty: updatedProducts[existingProductIndex].qty + item.qty,
                };
                return { products: updatedProducts };
            } else {
                return { products: [...state.products, item] };
            }
        });
    },
}))