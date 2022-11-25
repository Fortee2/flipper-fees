import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FeeTypes from "../enums/FeeTypes";
import Expense from "../model/Expense";

export interface iMercariFeeState{
    baseFee: Expense;
    paymentFeePercent: Expense;
    paymentFeeFixed: Expense;
}

const initState: iMercariFeeState = {
 
    baseFee: new Expense("Final Value Fee", 0, 10, FeeTypes.PERCENTAGE),
    paymentFeePercent: new Expense("Payment Fee 1", 0, 2.9, FeeTypes.PERCENTAGE),
    paymentFeeFixed: new Expense("Payment Fee 2", 0, 0.5, FeeTypes.FIXED),
}

export const MercariFeeSlice = createSlice({
    name: "mercariFees",
    initialState: initState,
    reducers: {
        setBaseFee: (state, action: PayloadAction<Expense>) => {
            state.baseFee = action.payload;
        },
        setPaymentFeePercent: (state, action: PayloadAction<Expense>) => {
            state.paymentFeePercent = action.payload;
        },
        setPaymentFeeFixed: (state, action: PayloadAction<Expense>) => {
            state.paymentFeeFixed = action.payload;
        }
    }   
});


export const { setPaymentFeePercent, setPaymentFeeFixed, setBaseFee } = MercariFeeSlice.actions;

export default MercariFeeSlice.reducer;