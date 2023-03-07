import { createSlice } from "@reduxjs/toolkit";

const setTransactionsInLocalStorage = (val) => {
    localStorage.setItem('MyTransactions', JSON.stringify(val));
}

const transactionSlice = createSlice({
    name: "transaction",
    initialState: localStorage.getItem('MyTransactions') ? JSON.parse(localStorage.getItem('MyTransactions')) : [],
    reducers: {
        addNewTransaction(state, action) {
            state.push(action.payload);
            setTransactionsInLocalStorage(state)
        },
        deleteSeletedTransaction(state, action) {
            const result = state.filter((transaction, index) => index != action.payload)
            setTransactionsInLocalStorage(result);
            return result;
        },
        saveEditTransaction(state, action) {
            state[action.payload.index] = action.payload.transaction;
            setTransactionsInLocalStorage(state)
        },
        deleteAllTransaction(state, action) {
            setTransactionsInLocalStorage([])
            return [];
        }
    }
})

export const { addNewTransaction, deleteSeletedTransaction, saveEditTransaction, deleteAllTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;