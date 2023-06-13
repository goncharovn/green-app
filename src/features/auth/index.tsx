import { useState } from 'react';
import { greenApi } from 'app/greenApi'
import { useAppDispatch } from 'app/hooks'
import { authorize } from './authSlice';

const Auth = () => {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')

	const dispatch = useAppDispatch()

	const [trigger] = greenApi.useLazyGetStateInstanceQuery()

	const handleClick = async () => {
		try {
			const result = await trigger({ idInstance, apiTokenInstance }).unwrap()

			if (result.stateInstance === 'authorized') {
				dispatch(
					authorize({
						isAuthorized: true,
						idInstance,
						apiTokenInstance
					})
				)
			}
		} catch (e) {
			console.log(e)
		}
	}

	return (
		<>
			<div>
				<input
					value={idInstance}
					onChange={(e) => setIdInstance(e.target.value)}
					placeholder="idInstance"
				/>
				<input
					value={apiTokenInstance}
					onChange={(e) => setApiTokenInstance(e.target.value)}
					placeholder="apiTokenInstance"
				/>
				<button onClick={handleClick}>Войти</button>
			</div>
		</>
	)
}

export default Auth
