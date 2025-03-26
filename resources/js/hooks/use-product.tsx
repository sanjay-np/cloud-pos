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
            const existingProductIndex = state.products.findIndex(product => product.id === item.id)
            if (existingProductIndex !== -1) {
                const updatedProducts = [...state.products];
                updatedProducts[existingProductIndex] = {
                    ...updatedProducts[existingProductIndex],
                    qty: updatedProducts[existingProductIndex].qty + item.qty,
                };
                const total = updatedProducts.reduce((sum, product) => sum + (product.price * product.qty), 0)
                return {
                    products: updatedProducts,
                    total: total,
                    grandTotal: calculateTotal(total, state.taxPercent, state.discount, state.shipping),
                };
            } else {
                const updatedProducts = [...state.products, item];
                const total = updatedProducts.reduce((sum, product) => sum + (product.price * product.qty), 0)
                return {
                    products: updatedProducts,
                    total: total,
                    grandTotal: calculateTotal(total, state.taxPercent, state.discount, state.shipping),
                };
            }
        });
    },

    removeProduct: (id: number) => {
        set((state) => {
            const updatedProducts = state.products.filter(product => product.id !== id);
            const total = updatedProducts.reduce((sum, product) => sum + (product.price * product.qty), 0)
            return {
                products: updatedProducts,
                total: total,
                grandTotal: calculateTotal(total, state.taxPercent, state.discount, state.shipping),
            };
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
                const total = updatedProducts.reduce((sum, product) => sum + (product.price * product.qty), 0)
                return {
                    products: updatedProducts,
                    total: total,
                    grandTotal: calculateTotal(total, state.taxPercent, state.discount, state.shipping),
                };
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
                const total = updatedProducts.reduce((sum, product) => sum + (product.price * product.qty), 0)
                return {
                    products: updatedProducts,
                    total: total,
                    grandTotal: calculateTotal(total, state.taxPercent, state.discount, state.shipping),
                };
            }
            return {};
        });
    },
    setTax: (taxPercent: number) => {
        set((state) => {
            const total = state.products.reduce((sum, product) => sum + (product.price * product.qty), 0)
            return {
                taxPercent: taxPercent,
                taxAmount: calculateTax(total, taxPercent),
                grandTotal: calculateTotal(total, taxPercent, state.discount, state.shipping),
            };
        })
    },
    setDiscount: (amount: number) => {
        set((state) => {
            const total = state.products.reduce((sum, product) => sum + (product.price * product.qty), 0)
            return {
                discount: amount,
                grandTotal: calculateTotal(total, state.taxPercent, amount, state.shipping),
            };
        })
    },
    setShipping: (amount: number) => {
        set((state) => {
            const total = state.products.reduce((sum, product) => sum + (product.price * product.qty), 0)
            return {
                shipping: amount,
                grandTotal: calculateTotal(total, state.taxPercent, state.discount, amount),
            };
        })
    }
}))

const calculateTotal = (subtotal: number, tax: number, discount: number, shipping: number) => {
    const totalWithTax = subtotal + (subtotal * tax / 100);
    const totalWithDiscount = totalWithTax - discount;
    return totalWithDiscount + shipping;
};

const calculateTax = (subtotal: number, tax: number) => {
    const taxAmount = (subtotal * tax / 100);
    return taxAmount
}