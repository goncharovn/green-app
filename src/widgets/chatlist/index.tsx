import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectChatlist, selectSelectedChatId, updateChatMessages } from './chatlistSlice'
import { selectChat } from './chatlistSlice'
import { greenApi } from 'app/greenApi'
import { selectAuthData } from 'features/auth/authSlice'
import { useEffect } from 'react'
import IChat from 'shared/interfaces/chat'
import cn from 'classnames'

const Chatlist = () => {
	const dispatch = useAppDispatch()
	const chatlist = useAppSelector(selectChatlist)
	const selectedChatId = useAppSelector(selectSelectedChatId)

	const authData = useAppSelector(selectAuthData)

	const { data, isSuccess } = greenApi.useReceiveNotificationQuery(authData, {
		pollingInterval: 3000
	})

	const [deleteNotification, { data: delData }] = greenApi.useDeleteNotificationMutation()

	useEffect(() => {
		console.log(`${JSON.stringify(data)}`)
		console.log(data?.body?.messageData?.textMessageData?.textMessage)

		const typeWebhook = data?.body.typeWebhook;

		if (typeWebhook === 'outgoingMessageReceived' || typeWebhook === 'incomingMessageReceived') {
			const chatId = String(parseInt(String(data?.body.senderData.chatId))) || null

			dispatch(
				updateChatMessages({
					chatId,
					message: data?.body.messageData.textMessageData.textMessage ?? ''
				})
			)
		}

		deleteNotification({ ...authData, receiptId: data?.receiptId ?? 0})
	}, [data, isSuccess])

	const handleSelectChat = (chatId: string) => {
		dispatch(selectChat({ chatId }))
	}

	return (
		<ul>
			{chatlist.map((chat: IChat) => (
				<li
					className={cn('chatItem', { 'chatItem--active': chat.chatId === selectedChatId })}
					key={chat.chatId}
					onClick={() => handleSelectChat(chat.chatId)}
				>
					{chat.chatId}
				</li>
			))}
		</ul>
	)
}

export default Chatlist
