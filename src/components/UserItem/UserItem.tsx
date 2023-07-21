import {Avatar, Collapse, Skeleton, Space, Typography} from 'antd'
import {FC} from 'react'
import {RepositoryList} from '../RepositoryList'
import type {User} from '../../types/user'
import './UserItem.scss'

export interface UserItemProps {
  user: User
  onCollapse: (value: string | string[]) => void
  isFetching?: boolean
}

export const UserItem: FC<UserItemProps> = ({isFetching, user, onCollapse}) => {
  const renderRepositoryList = () => {
    if (isFetching) return <Skeleton active />
    if (!user.repositories) return null
    return <RepositoryList isFetching={isFetching} username={user.login} repositories={user.repositories} />
  }

  const renderLabel = () => (
    <Space>
      <Avatar src={user.avatar_url} size="large" />
      <Typography>{user.login}</Typography>
    </Space>
  )

  return (
    <Collapse
      size="middle"
      onChange={onCollapse}
      bordered={false}
      expandIconPosition="end"
      items={[{key: user.login, label: renderLabel(), children: renderRepositoryList()}]}
    />
  )
}
