import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
export interface GetClothesProps {
	id: string
	title: string
	price: number
	category: string
	description: string
	image: string
}
export interface ClothesSliceProps {
	clothes: GetClothesProps | []
	loading: boolean
	error: boolean
}
export const getClothes = createAsyncThunk<GetClothesProps>('clothes/getClothes', async (thunkAPI: any) => {
	try {
		const res = await fetch('https://fakestoreapi.com/products')
		if (!res.ok) {
			throw new Error('Something went wrong!')
		}
		const data: GetClothesProps[] = await res.json()
		const loadedData = []
		for (const key in data) {
			loadedData.push({
				id: key,
				title: data[key].title,
				price: data[key].price,
				category: data[key].category,
				description: data[key].description,
				image: data[key].image,
			})
		}
		const clothesArr = loadedData.filter(item => {
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
