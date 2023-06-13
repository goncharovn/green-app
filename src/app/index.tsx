import './index.scss'
import Messenger from 'widgets/messenger'
import { withProviders } from './providers'

const App = () => {
	return <Messenger />
}

export default withProviders(App)
