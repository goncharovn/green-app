import { useAppSelector } from 'app/hooks'
import { selectSelectedChatId } from 'widgets/chatlist/chatlistSlice'
import MessagesContainer from 'widgets/messages-container'
import SendMessage from 'features/send-message'
import './style.scss'

const MessageArea = () => {
	const chatId = useAppSelector(selectSelectedChatId)

	return (
		<div className='message-area'>
			<MessagesContainer />
			{chatId && <SendMessage />}
		</div>
	)
}

export default MessageArea
