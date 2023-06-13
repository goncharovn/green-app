import { useAppSelector } from 'app/hooks'
import { selectSelectedChat } from 'widgets/chatlist/chatlistSlice'
import './style.scss'

const MessagesContainer = () => {
	const selectedChat = useAppSelector(selectSelectedChat)

	return (
		<ul className='messages-container'>
			{selectedChat?.messages.map((message, index) => (
				<li key={index}>{message}</li>
			))}
		</ul>
	)
}

export default MessagesContainer
