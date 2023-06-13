import { greenApi } from 'app/greenApi'
import { useAppDispatch, useAppSelector } from 'app/hooks'
import { selectAuthData } from 'features/auth/authSlice'
import { useState } from 'react'
import { selectSelectedChatId, updateChatMessages } from 'widgets/chatlist/chatlistSlice'
import './style.scss'

const SendMessage = () => {
	const dispatch = useAppDispatch()
	const authData = useAppSelector(selectAuthData)

	const chatId = useAppSelector(selectSelectedChatId)

	const [message, setMessage] = useState('')

	const [sendMessage, { }] = greenApi.useSendMessageMutation()

	const handleSendMessage = async () => {
		const messageBody = {
			message: {
				'chatId': `${chatId}@c.us`,
				'message': message
			},
			...authData
		}

		try {
			await sendMessage(messageBody).unwrap()

			dispatch(
				updateChatMessages({
					chatId,
					message,
				})
			)

			setMessage('')
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<div className='send-message'>
			<input
				className='send-message__input'
				placeholder="Введите сообщение"
				value={message}
				onChange={(e) => setMessage(e.target.value)}
			/>

			<button onClick={handleSendMessage}>Отправить сообщение</button>
		</div>
	)
}

export default SendMessage
