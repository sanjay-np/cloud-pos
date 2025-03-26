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
    removeProduct: (id: number) => void;
    changeQty: (id: number, qty: number) => void;
    changePrice: (id: number, price: number) => void;
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

    removeProduct: (id: number) => {
        set((state) => {
            const updatedProducts = state.products.filter(product => product.id !== id);
            return { products: updatedProducts };
        });
    },

    changeQty: (id: number, qty: number) => {
        set((state) => {
            if (qty < 0) return {};
            const existingProductIndex = state.products.findIndex(product => product.id === id);
            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.products];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    qty: qty,
                };
                return { products: updatedProducts };
            }
            return {};
        });
    },

    changePrice: (id: number, price: number) => {
        set((state) => {
            const existingProductIndex = state.products.findIndex(product => product.id === id);
            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.products];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    price: price,
                };
                return { products: updatedProducts };
            }
            return {};
        });
    },

}))