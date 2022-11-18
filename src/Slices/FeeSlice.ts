import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import Fee from "../model/Fee";

export interface iFeeState {
    fees: Fee[];
}

const initState: iFeeState = {
    fees: [{name: "Base Fee", amount: 0.3}],
}

const FeeSlice = createSlice({
    name: "feeAmmounts",
    initialState: initState,
    reducers: {
        addFee: (state, action: PayloadAction<Fee>) => {
            state.fees.push(action.payload);
        },
        removeFee: (state, action: PayloadAction<Fee>) => {
            state.fees = state.fees.filter(fee => fee.name !== action.payload.name);
        }
    }   
});

export const { addFee, removeFee } = FeeSlice.actions;

export const selectSpecificFeeAmount = (state: RootState, name: string) => {
    const singleFee  = state.feesList.fees.find(fee => fee.name === name);

    if(singleFee){
        return singleFee.amount;
    }

    return 0;
}

export const selectTotalFees = (state: RootState) => {
    let total = 0;
    state.feesList.fees.forEach(fee => {
        total += fee.amount;
    });
    return total;
}

export default FeeSlice.reducer;