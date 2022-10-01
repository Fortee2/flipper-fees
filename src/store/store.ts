import { configureStore } from '@reduxjs/toolkit'
import calcuatorReducer from '../Slices/CalculatorSlice'
import feeReducer from '../Slices/FeeSlice'
import thunk from 'redux-thunk'

export const store = configureStore({
  reducer: {
    calculator: calcuatorReducer,
    fees: feeReducer
  },
   middleware: [thunk]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch