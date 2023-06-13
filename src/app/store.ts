import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import { greenApi } from './greenApi'
import authSlice from 'features/auth/authSlice'
import chatlistSlice from 'widgets/chatlist/chatlistSlice'

const rootReducer = combineReducers({
	auth: authSlice,
	chatlist: chatlistSlice,
	[greenApi.reducerPath]: greenApi.reducer,
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(greenApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
