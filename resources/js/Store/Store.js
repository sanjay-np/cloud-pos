import { configureStore } from "@reduxjs/toolkit";
import { PurchaseProductSlice } from "./Reducers/PurchaseProductSlice";

export const store = configureStore({
    reducer: {
        [PurchaseProductSlice.name]: PurchaseProductSlice.reducer
    }
})