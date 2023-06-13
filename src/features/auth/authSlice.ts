import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from 'app/store'

interface IAuthData {
	isAuthorized: boolean
	idInstance: string
	apiTokenInstance: string
}

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthorized: localStorage.getItem('idInstance') !== null && localStorage.getItem('apiTokenInstance') !== null,
		idInstance: localStorage.getItem('idInstance') || '',
		apiTokenInstance: localStorage.getItem('apiTokenInstance') || ''
	},
	reducers: {
		authorize: (state, action: PayloadAction<IAuthData>) => {
			state.isAuthorized = action.payload.isAuthorized
			state.idInstance = action.payload.idInstance
			state.apiTokenInstance = action.payload.apiTokenInstance

			localStorage.setItem('idInstance', action.payload.idInstance)
			localStorage.setItem('apiTokenInstance', action.payload.apiTokenInstance)
		}
	}
})

export const { authorize } = authSlice.actions

export const selectIsAuthorized = (state: RootState) => state.auth.isAuthorized
export const selectAuthData = (state: RootState) => ({
	idInstance: state.auth.idInstance,
	apiTokenInstance: state.auth.apiTokenInstance
})

export default authSlice.reducer
