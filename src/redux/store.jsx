import { configureStore } from "@reduxjs/toolkit";
import transactionSlice from "./slices/transactionSlice";

const store = configureStore({
    reducer: {
        transactions: transactionSlice,
    }
})

export default store;