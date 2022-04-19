import { createSlice } from '@reduxjs/toolkit'
interface ViewSliceProps {
	view: boolean
}
const viewSlice = createSlice({
	name: 'view',
	initialState: { view: true } as ViewSliceProps,
	reducers: {
		toggleView(state) {
			state.view = !state.view
		},
	},
})
export const viewActions = viewSlice.actions
export default viewSlice
