import { useAppDispatch } from 'app/hooks'
import { useState } from 'react'

import { addChat } from 'widgets/chatlist/chatlistSlice'

const AddChat = () => {
  const dispatch = useAppDispatch()

  const [chatId, setChatId] = useState('')

  const handleAddChat = () => {
    dispatch(addChat({ chatId }))
    setChatId('')
  }

  return (
    <>
      <input
        value={chatId}
        onChange={(e) => setChatId(e.target.value)}
        placeholder="Введите номер телефона"
      />

      <button onClick={handleAddChat}>Добавить чат</button>
    </>
  )
}

export default AddChat
