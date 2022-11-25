import { configureStore } from '@reduxjs/toolkit'
import calcuatorReducer from '../Slices/CalculatorSlice'
import eBayFeeReducer from '../Slices/EbayFeeSlice'
import MercariFeeReducer from '../Slices/MercariFeeSlice'
import FeeReducer from '../Slices/FeeSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    calculator: calcuatorReducer,
    feesList: FeeReducer,
    eBayFees: eBayFeeReducer,
    mercariFees: MercariFeeReducer
  },
   middleware: [thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch