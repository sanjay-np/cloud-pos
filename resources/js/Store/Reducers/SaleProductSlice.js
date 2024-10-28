import { calculateTax, calculateTotal } from "@/Lib/Utils";
import { createSlice } from "@reduxjs/toolkit";

export const SaleProductSlice = createSlice({
    name: "saleProductSlice",
    initialState: {
        products: [],
        taxPercent: 0,
        taxAmount: 0,
        discount: 0,
        shipping: 0,
        total: 0,
    },
    reducers: {

        /**
         * Adds a product to the state or increases the quantity if the product already exists.
         * @param {Object} action.payload - The product to be added with its quantity
         * @param {Number} action.payload.id - The product's id
         * @param {Number} action.payload.qty - The quantity of the product to be added
         */

        setSaleProduct(state, action) {
            const existingProductIndex = state.products.findIndex(product => product.id === action.payload.id);
            if (existingProductIndex !== -1) {
                state.products[existingProductIndex].qty += action.payload.qty;
            } else {
                state.products = [...state.products, { ...action.payload, qty: action.payload.qty }];
            }
            state.taxAmount = calculateTax(state.products, state.taxPercent);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Removes a product from the state.
         * @param {Number} action.payload - The id of the product to be removed
         */

        removeSaleProduct(state, action) {
            state.products = state.products.filter(item => item.id !== action.payload);
            state.taxAmount = calculateTax(state.products, state.taxPercent);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Sets the quantity of a product in the state.
         * @param {Object} action.payload - The object containing the id and qty of the product
         * @param {Number} action.payload.id - The id of the product to be modified
         * @param {Number} action.payload.qty - The new quantity of the product
         */

        setQty(state, action) {
            const { id, qty } = action.payload
            state.products = state.products.map(item => {
                if (item.id === id) { item.qty = qty }
                return item
            })
            state.taxAmount = calculateTax(state.products, state.taxPercent);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Sets the purchase price of a product in the state.
         * @param {Object} action.payload - The object containing the id, price and type of the product
         * @param {Number} action.payload.id - The id of the product to be modified
         * @param {Number} action.payload.price - The new price of the product
         * @param {String} action.payload.type - The type of price to be modified ("purchase" or "price")
         */

        setProductPrice(state, action) {
            const { id, price, type } = action.payload
            state.products = state.products.map(item => {
                if (item.id === id) {
                    type === "purchase" ? item.unit_price = price : item.sale_price = price;
                }
                return item
            })
            state.taxAmount = calculateTax(state.products, state.taxPercent);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Sets the tax percentage in the state.
         * @param {Number} action.payload - The new tax percentage
         */

        setTax(state, action) {
            state.taxPercent = action.payload;
            state.taxAmount = calculateTax(state.products, action.payload);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Sets the discount amount in the state.
         * @param {Number} action.payload - The new discount amount
         */

        setDiscount(state, action) {
            state.discount = parseFloat(action.payload);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },

        /**
         * Sets the shipping cost in the state.
         * @param {Number} action.payload - The new shipping cost
         */

        setShipping(state, action) {
            state.shipping = parseFloat(action.payload);
            state.total = calculateTotal(state.products, state.taxPercent, state.discount, state.shipping);
        },
    }
})

export const {
    setSaleProduct,
    removeSaleProduct,
    setQty,
    setProductPrice,
    setTax,
    setDiscount,
    setShipping
} = SaleProductSlice.actions