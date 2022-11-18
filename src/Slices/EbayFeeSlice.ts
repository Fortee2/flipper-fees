import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import FeeTypes from "../enums/FeeTypes";
import Expense from "../model/Expense";

export interface iEbayFeeState{
    baseFee: Expense;
    finalValueFee: Expense;
    belowStdFee: Expense;
}

const initState: iEbayFeeState = {
    baseFee: new Expense("Base Fee", 0, 0.3, FeeTypes.FIXED),
    finalValueFee: new Expense("Final Value Fee", 0, 12.9, FeeTypes.PERCENTAGE),
    belowStdFee: new Expense("Below Standard Fee", 0, 6, FeeTypes.PERCENTAGE),
}

export const eBayFeeSlice = createSlice({
    name: "eBayFees",
    initialState: initState,
    reducers: {
        setBaseFee: (state, action: PayloadAction<Expense>) => {
            state.baseFee = action.payload;
        },
        setFinalValueFee: (state, action: PayloadAction<Expense>) => {
            state.finalValueFee = action.payload;
        },
        setBelowStdFee: (state, action: PayloadAction<Expense>) => {
            state.belowStdFee = action.payload;
        }
    }   
});


export const { setBaseFee, setFinalValueFee, setBelowStdFee } = eBayFeeSlice.actions;

export default eBayFeeSlice.reducer;