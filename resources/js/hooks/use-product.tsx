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
    grandTotal: number;
    setProduct: (item: Product) => void;
    removeProduct: (id: number) => void;
    changeQty: (id: number, qty: number) => void;
    changePrice: (id: number, price: number) => void;
    setTax: (taxPercent: number) => void;
    setDiscount: (amount: number) => void;
    setShipping: (amount: number) => void;
}

export const useProductStore = create<ProductStoreState>((set, get) => ({
    products: [],
    taxPercent: 0,
    taxAmount: 0,
    discount: 0,
    shipping: 0,
    total: 0,
    grandTotal: 0,

    setProduct: (item: Product) => {
        set((state) => {
            const existingProductIndex = state.products.findIndex(product => product.id === item.id);
            const updatedProducts = [...state.products];

            if (existingProductIndex !== -1) {
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    qty: updatedProducts[existingProductIndex].qty + item.qty,
                };
            } else {
                updatedProducts.push(item);
            }

            return updateTotals(updatedProducts, state);
        });
    },

    removeProduct: (id: number) => {
        set((state) => {
            const updatedProducts = state.products.filter(product => product.id !== id);
            return updateTotals(updatedProducts, state);
        });
    },

    changeQty: (id: number, qty: number) => {
        set((state) => {
            if (qty < 0) return {}; // Prevent invalid quantity
            const updatedProducts = state.products.map(product =>
                product.id === id ? { ...product, qty } : product
            );
            return updateTotals(updatedProducts, state);
        });
    },

    changePrice: (id: number, price: number) => {
        set((state) => {
            const updatedProducts = state.products.map(product =>
                product.id === id ? { ...product, price } : product
            );
            return updateTotals(updatedProducts, state);
        });
    },

    setTax: (taxPercent: number) => {
        set((state) => {
            const taxAmount = calculateTax(state.total, taxPercent);
            return {
                taxPercent,
                taxAmount,
                grandTotal: calculateGrandTotal(state.total, taxAmount, state.discount, state.shipping),
            };
        });
    },

    setDiscount: (amount: number) => {
        set((state) => {
            return {
                discount: amount,
                grandTotal: calculateGrandTotal(state.total, state.taxAmount, amount, state.shipping),
            };
        });
    },

    setShipping: (amount: number) => {
        set((state) => {
            return {
                shipping: amount,
                grandTotal: calculateGrandTotal(state.total, state.taxAmount, state.discount, amount),
            };
        });
    }
}));


const calculateTotal = (products: Product[]) => {
    return products.reduce((sum, product) => sum + (product.price * product.qty), 0);
};


const calculateTax = (subtotal: number, tax: number) => {
    return (subtotal * tax) / 100;
};


const calculateGrandTotal = (subtotal: number, taxAmount: number, discount: number, shipping: number) => {
    const totalWithTax = subtotal + taxAmount;
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};


const updateTotals = (updatedProducts: Product[], state: ProductStoreState) => {
    const total = calculateTotal(updatedProducts);
    const taxAmount = calculateTax(total, state.taxPercent);
    return {
        products: updatedProducts,
        total,
        grandTotal: calculateGrandTotal(total, taxAmount, state.discount, state.shipping),
        taxAmount,
    };
};
