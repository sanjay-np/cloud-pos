import { configureStore } from "@reduxjs/toolkit";
import { PurchaseProductSlice } from "./Reducers/PurchaseProductSlice";
import { SaleProductSlice } from "./Reducers/SaleProductSlice";

export const store = configureStore({
    reducer: {
        [PurchaseProductSlice.name]: PurchaseProductSlice.reducer,
        [SaleProductSlice.name]: SaleProductSlice.reducer
    }
})