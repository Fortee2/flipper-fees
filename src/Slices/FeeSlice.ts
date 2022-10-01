import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Expense from "../model/Expense";
import SellingFee from "../model/SellingFee";
import { RootState } from "../store/store";

export interface iFeeStore{
    platformFee: SellingFee;
}

const initState: iFeeStore = {
    platformFee: new SellingFee("eBay", [])
}

export const feeSlice = createSlice({
    name: "fees",
    initialState: initState,
    reducers: {
        setIntialFees: (state, action: PayloadAction<SellingFee>) => {
            state.platformFee = action.payload;
        },
        setPlatformName: (state, action: PayloadAction<SellingFee>) => {
            state.platformFee = action.payload;
        },
        addFee: (state, action: PayloadAction<Expense>) => { 
            state.platformFee.fees.push(action.payload);
        },
        removeFee: (state, action: PayloadAction<string>) => {
            const idx = state.platformFee.fees.findIndex((fee) => fee.name === action.payload);
            if(idx !== -1){
                state.platformFee.fees.splice(idx, 1);
            }
        },
        updateFee: (state, action: PayloadAction<Expense>) => {
            const idx = state.platformFee.fees.findIndex((fee) => fee.name === action.payload.name);
            if(idx !== -1){
                state.platformFee.fees[idx] = action.payload;
            }
        }   

    }   
});


export const { setIntialFees, setPlatformName, addFee, removeFee, updateFee } = feeSlice.actions;

export const selectTotalFees = (state: RootState) => {
    let total = 0;
    state.fees.platformFee.fees.forEach(fee => {
        total += fee.amount;
    });
    return total;
}

export const selectSepecificFee = (state: RootState, feeName: string):Expense  => {
    const idx = state.fees.platformFee.fees.findIndex((fee) => fee.name === feeName);
    if(idx !== -1){
        return state.fees.platformFee.fees[idx];
    }
    return new Expense("Error", 0);
}

export default feeSlice.reducer;