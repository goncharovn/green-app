import { SyntheticEvent, useState } from 'react';
import { greenApi } from 'app/greenApi'
import { useAppDispatch } from 'app/hooks'
import { authorize } from './authSlice'
import './style.scss'

const Auth = () => {
	const [idInstance, setIdInstance] = useState('')
	const [apiTokenInstance, setApiTokenInstance] = useState('')

	const dispatch = useAppDispatch()

	const [trigger] = greenApi.useLazyGetStateInstanceQuery()

	const handleClick = async (event: SyntheticEvent) => {
		try {
			event.preventDefault();

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
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div
			className='authFormWrapper'
		>
			<form
				className='authForm'
			>
				<span className='authForm__hint'>Чтобы воспользоваться сервисом, зарегистрируйтесь <a href="https://console.green-api.com/auth/register">здесь</a>.</span>
				<input
					className='input'
					value={idInstance}
					onChange={(e) => setIdInstance(e.target.value)}
					placeholder="idInstance"
					autoFocus
				/>
				<input
					className='input'
					value={apiTokenInstance}
					onChange={(e) => setApiTokenInstance(e.target.value)}
					placeholder="apiTokenInstance"
				/>
				<button
					className='button authForm__button button--green'
					onClick={handleClick}
				>
					Войти
				</button>
			</form>
		</div>
	)
}

export default Auth
