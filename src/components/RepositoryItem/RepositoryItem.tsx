import {Card, Space, Tooltip, Typography} from 'antd'
import type {Repository} from '../../types/repository'
import {FC} from 'react'
import {BranchesOutlined, LinkOutlined, StarFilled} from '@ant-design/icons'

export interface RepositoryItemProps {
  repository: Repository
}

export const RepositoryItem: FC<RepositoryItemProps> = ({repository}) => {
  const renderExtra = () => (
    <Space size="middle">
      <Tooltip title="Forks">
        <div className="flex flex-row items-center gap-1">
          <Typography>{repository.forks_count}</Typography>
          <BranchesOutlined />
        </div>
      </Tooltip>
      <Tooltip title="Stars">
        <div className="flex flex-row items-center gap-1">
          <Typography>{repository.stargazers_count}</Typography>
          <StarFilled />
        </div>
      </Tooltip>
      <Tooltip title="Open Repository">
        <a href={repository.html_url} target="__blank" className="text-black">
          <LinkOutlined />
        </a>
      </Tooltip>
    </Space>
  )

  return (
    <Card title={repository.name} extra={renderExtra()}>
      <Typography>{repository.description || 'No Description'}</Typography>
    </Card>
  )
}
