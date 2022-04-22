import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { InitialFormValues } from 'components/FormModal/FormModal'
import { toast } from 'react-toastify'
interface RegisterAithSliceProps {
	processing: boolean
	error: boolean
	errorMessage: string
}
interface LoginAuthSliceProps {
	processing: boolean
	error: boolean
	errorMessage: string
	isLogged: boolean
	token: string | null
}

const API_KEY = process.env.REACT_APP_API_KEY

export const registerAuth = createAsyncThunk(
	'registerAuth/registerAuth',
	async (values: InitialFormValues, thunkAPI) => {
		try {
			const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`, {
				method: 'POST',
				body: JSON.stringify({
					email: values.email,
					password: values.password,
					returnSecureToken: true,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			})
			let data = await res.json()
			if (res.ok) {
				toast.success('Account created', {
					position: 'bottom-left',
					theme: 'colored',
				})
			} else {
				toast.error('Could not create an account', {
					position: 'bottom-left',
					theme: 'colored',
				})
				return thunkAPI.rejectWithValue(data.error.message)
			}
		} catch (error) {
			return thunkAPI.rejectWithValue(error)
		}
	}
)

export const loginAuth = createAsyncThunk('loginAuth/loginAuth', async (values: InitialFormValues, thunkAPI) => {
	try {
		const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`, {
			method: 'POST',
			body: JSON.stringify({
				email: values.email,
				password: values.password,
				returnSecureToken: true,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		})
		let data = await res.json()
		if (res.ok) {
			toast.success('Logged in successfully', {
				position: 'bottom-left',
				theme: 'colored',
			})
			//rzeczy z tokenami do nowego pliku
			localStorage.setItem('idToken', data.idToken)
		} else {
			toast.error('Could not log in', {
				position: 'bottom-left',
				theme: 'colored',
			})
			return thunkAPI.rejectWithValue(data.error.message)
		}
	} catch (error) {
		return thunkAPI.rejectWithValue(error)
	}
})

const registerAuthSlice = createSlice({
	name: 'regAuth',
	initialState: {
		processing: false,
		error: false,
		errorMessage: '',
	} as RegisterAithSliceProps,
	reducers: {},
	extraReducers: builder => {
		builder.addCase(registerAuth.pending, state => {
			state.processing = true
		})
		builder.addCase(registerAuth.fulfilled, state => {
			state.processing = false
			state.error = false
		})
		builder.addCase(registerAuth.rejected, (state, action) => {
			const payload = action.payload as string
			state.processing = false
			state.error = true
			state.errorMessage = payload
		})
	},
})
const loginAuthSlice = createSlice({
	name: 'logAuth',
	initialState: {
		processing: false,
		error: false,
		errorMessage: '',
		isLogged: false,
		token: localStorage.getItem('idToken') ? localStorage.getItem('idToken') : null,
	} as LoginAuthSliceProps,
	reducers: {
		expirationTime() {},
		userLogout(state) {
			toast.success('Logged out', {
				position: 'bottom-left',
				theme: 'colored',
			})
			state.isLogged = false
			localStorage.removeItem('idToken')
		},
	},
	extraReducers: builder => {
		builder.addCase(loginAuth.pending, state => {
			state.processing = true
		})
		builder.addCase(loginAuth.fulfilled, state => {
			state.processing = false
			state.error = false
			state.errorMessage = ''
			state.isLogged = true
		})
		builder.addCase(loginAuth.rejected, (state, action) => {
			const payload = action.payload as string
			state.processing = false
			state.error = true
			state.errorMessage = payload
			state.token = null
		})
		// jak mam try caych action payload zawsze będzie unknown
	},
})
const userAuthSlice = createSlice({
	name: 'auth',
	initialState: { formModalOpen: false },
	reducers: {
		modalFormHandler(state) {
			state.formModalOpen = !state.formModalOpen
		},
	},
})
export const userAuthActions = userAuthSlice.actions
export const registerAuthActions = registerAuthSlice.actions
export const loginAuthActions = loginAuthSlice.actions
export { userAuthSlice, registerAuthSlice, loginAuthSlice }
