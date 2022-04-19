import { configureStore } from '@reduxjs/toolkit'
import clothesReducer from './fetchapi-slice'
import sortingReducer from './sorting-slice'
import filteringReducer from './filtering-slice'
import cartReducer from './cart-slice'
import viewReducer from './view-slice'
import { userAuthSlice, registerAuthSlice, loginAuthSlice } from './userAuth-slice'
const store = configureStore({
	reducer: {
		fetchClothes: clothesReducer.reducer,
		sortingClothes: sortingReducer.reducer,
		filteringClothes: filteringReducer.reducer,
		cart: cartReducer.reducer,
		view: viewReducer.reducer,
		userAuth: userAuthSlice.reducer,
		regAuth: registerAuthSlice.reducer,
		logAuth: loginAuthSlice.reducer,
	},
})
export type RootState = ReturnType<typeof store.getState>
export default store
