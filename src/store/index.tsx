import { configureStore } from '@reduxjs/toolkit'
import clothesReducer from './fetchapi-slice'
import sortingReducer from '../features/Shop/components/ShopNavigation/sorting-slice'
import filteringReducer from '../features/Shop/components/ShopNavigation/filtering-slice'
import cartReducer from '../features/Cart/cart-slice'
import viewReducer from '../features/Shop/components/ShopNavigation/view-slice'
import { userAuthSlice, registerAuthSlice, loginAuthSlice } from '../components/FormModal/userAuth-slice'
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
