import Aside from 'widgets/aside'
import MessageArea from 'widgets/message-area'
import './style.scss'

const Messenger = () => {
	return (
		<div className='messenger'>
			<Aside />
			<MessageArea />
		</div>
	)
}

export default Messenger
