import Auth from '../../features/auth'
import { useAppSelector } from 'app/hooks'
import { selectIsAuthorized } from 'features/auth/authSlice'

const withAuth = (Component: React.ComponentType) => {
	const WithAuth = () => {
		const isAuthorized = useAppSelector(selectIsAuthorized)

		if (isAuthorized) {
			return <Component />
		} else {
			return <Auth />
		}
	}

	return WithAuth
}

export default withAuth
