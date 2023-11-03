import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchPizzas = createAsyncThunk(
	'pizza/fetchPizzasStatus',
	async (params, thunkApi) => {
		const { sortBy, order, category, search, currentPage } = params
		const { data } = await axios.get(
			`https://64e0c6ba50713530432caae7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
		)
		return data
	}
)

const initialState = {
	items: [],
	status: 'loading', //loading | success | error
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},

	extraReducers: {
		[fetchPizzas.pending]: state => {
			state.status = 'loading'
      state.items = []
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.items = action.payload
			state.status = 'success'
		},
		[fetchPizzas.rejected]: (state, action) => {
			console.log(action, 'rejected');
			state.status = 'error'
			state.items = []
		},
	},
})

export const selectPizzaData = state => state.pizza

export const { setItems } = pizzaSlice.actions
export default pizzaSlice.reducer
