import React from 'react'

import Wrapper from '../../../components/Wrapper'
import { CustomTable } from './leaderboard.styled'

const Leaderboard = () => {
  const dataSource = [
    {
      key: '1',
      username: 'Mike',
      score: 3269894,
      date: '10 may 2024',
    },
    {
      key: '2',
      username: 'Mike',
      score: 3269894,
      date: '10 may 2024',
    },
    {
      key: '3',
      username: 'Mike',
      score: 3269894,
      date: '10 may 2024',
    },
  ]

  const columns = [
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Score',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]

  // Стилизировал компонент так, что бы таблица занимала левую часть экрана, а правую оставил пустой, т.к. растянутый лидерборд смотрится не очень
  // При надобности переделаю
  // Справа можно расположить что навигацию, ссылку на форум, кнопку начать новую игру и т.д.

  return (
    <Wrapper>
      <CustomTable dataSource={dataSource} columns={columns} />
    </Wrapper>
  )
}

export default Leaderboard
