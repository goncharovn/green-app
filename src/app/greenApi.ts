import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

interface IMessageData extends IAuthData {
	message: {
		chatId: string
		message: string
	}
}

interface INotification {
	receiptId: number
	body: {
		typeWebhook: string
		instanceData: {
			idInstance: number
			wid: string
			typeInstance: string
		}
		timestamp: number
		idMessage: string
		senderData: {
			chatId: string
			sender: string
			chatName: string
			senderName: string
		}
		messageData: {
			textMessageData: {
				textMessage: string
			}
		}
	}
}

interface IAuthData {
	idInstance: string
	apiTokenInstance: string
}

interface IStateInstance {
	stateInstance: string
}

interface IDeleteNotificationResponse {
	result: boolean
}

interface IDeleteNotificationData extends IAuthData {
	receiptId: number
}

export const greenApi = createApi({
	reducerPath: 'greenApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://api.green-api.com' }),
	endpoints: builder => ({
		getStateInstance: builder.query<IStateInstance, IAuthData>({
			query: (data) => ({
				url: `/waInstance${data.idInstance}/getStateInstance/${data.apiTokenInstance}`,
			})
		}),
		sendMessage: builder.mutation<IMessageData, IMessageData>({
			query: (data) => ({
				url: `/waInstance${data.idInstance}/SendMessage/${data.apiTokenInstance}`,
				method: 'POST',
				body: data.message
			})
		}),
		receiveNotification: builder.query<INotification, IAuthData>({
			query: (data) => ({
				url: `/waInstance${data.idInstance}/receiveNotification/${data.apiTokenInstance}`,
			})
		}),
		deleteNotification: builder.mutation<IDeleteNotificationResponse, IDeleteNotificationData>({
			query: (data) => ({
				url: `/waInstance${data.idInstance}/deleteNotification/${data.apiTokenInstance}/${data.receiptId}`,
				method: 'DELETE'
			})
		}),
	})
})

export const {
	useSendMessageMutation,
	useReceiveNotificationQuery,
	useLazyGetStateInstanceQuery
} = greenApi
