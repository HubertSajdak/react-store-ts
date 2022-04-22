import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiItems } from 'types'
import axios from 'axios'
export interface ClothProps {
	id: string
	title: string
	price: number
	image: string
	category: string
	description: string
}

export interface ClothesSliceProps {
	clothes: ClothProps[]
	loading: boolean
	error: boolean
}
export const getClothes = createAsyncThunk('clothes/getClothes', async (_, thunkAPI) => {
	try {
		const res = await axios('https://fakestoreapi.com/products')

		const data: apiItems[] = await res.data
		const newData = data.map(item => ({
			id: `${item.id}`,
			title: item.title,
			price: item.price,
			category: item.category,
			description: item.description,
			image: item.image,
		}))

		const clothesArr = newData.filter(item => {
			return ["men's clothing", "women's clothing"].includes(item.category)
		})
		return clothesArr
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

const clothesSlice = createSlice({
	name: 'clothes',
	initialState: {
		clothes: [],
		loading: false,
		error: false,
	} as ClothesSliceProps,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(getClothes.pending, state => {
			state.loading = true
		})
		builder.addCase(getClothes.fulfilled, (state, action) => {
			state.loading = false
			state.clothes = action.payload
		})
		builder.addCase(getClothes.rejected, state => {
			state.loading = false
			state.error = true
		})
	},
})
export default clothesSlice
