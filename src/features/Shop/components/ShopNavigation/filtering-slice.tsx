import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const filteringSlice = createSlice({
	name: 'filtering',
	initialState: { filterValue: [] as string[] },
	reducers: {
		newFilterValue(state, action: PayloadAction<string[]>) {
			state.filterValue = action.payload
		},
	},
})

export const filteringActions = filteringSlice.actions
export default filteringSlice
