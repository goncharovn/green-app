import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'app/store'
import IChat from 'shared/interfaces/chat'

interface IChatState {
	chatlist: IChat[]
	selectedChatId: string | null
}

const chatlistSlice = createSlice({
	name: 'chatlist',
	initialState: {
		chatlist: [],
		selectedChatId: null
	} as IChatState,
	reducers: {
		addChat: (state, action: PayloadAction<{ chatId: string }>) => {
			const { chatId } = action.payload
			state.chatlist.push({ chatId, messages: [] })
		},
		updateChatMessages: (
			state,
			action: PayloadAction<{ chatId: string | null; message: string }>
		) => {
			const { chatId, message } = action.payload
			const chatIndex = state.chatlist.findIndex((chat) => chat.chatId === chatId)

			if (chatIndex !== -1) {
				state.chatlist[chatIndex].messages.push(message)
			} else {
				state.chatlist.push({ chatId: chatId!, messages: [message] })
			}
		},
		selectChat: (state, action: PayloadAction<{ chatId: string }>) => {
			state.selectedChatId = action.payload.chatId
		},
	},
})

export const { addChat, updateChatMessages, selectChat } = chatlistSlice.actions

export const selectChatlist = (state: RootState) => state.chatlist.chatlist
export const selectSelectedChatId = (state: RootState) => state.chatlist.selectedChatId
export const selectSelectedChat = (state: RootState) => state.chatlist.chatlist.find((chat) => chat.chatId === state.chatlist.selectedChatId)


export default chatlistSlice.reducer
