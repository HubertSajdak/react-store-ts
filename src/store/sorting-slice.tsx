import { createSlice } from '@reduxjs/toolkit'
interface SortingSliceProps {
	sortAs: string
}
const sortingSlice = createSlice({
	name: 'sorting',
	initialState: { sortAs: 'none' } as SortingSliceProps,
	reducers: {
		sortNone(state) {
			state.sortAs = 'none'
		},
		sortPriceAsc(state) {
			state.sortAs = 'priceAsc'
		},
		sortPriceDes(state) {
			state.sortAs = 'priceDes'
		},
		sortA_Z(state) {
			state.sortAs = 'titleAsc'
		},
		sortZ_A(state) {
			state.sortAs = 'titleDes'
		},
	},
})

export const sortingActions = sortingSlice.actions
export default sortingSlice
