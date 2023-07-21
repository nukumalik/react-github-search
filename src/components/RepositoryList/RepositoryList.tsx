import {Divider, Input, List, Skeleton} from 'antd'
import {ChangeEvent, FC, useState} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {RepositoryItem} from '../RepositoryItem'
import type {Repository} from '../../types/repository'

export interface RepositoryListProps {
  isFetching?: boolean
  username: string
  repositories: Repository[]
}

export const RepositoryList: FC<RepositoryListProps> = ({isFetching, username, repositories}) => {
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')

  const loadMoreData = (value?: number) => {
    setIsLoading(true)
    setTimeout(() => {
      setPage(value || page + 1)
      setIsLoading(false)
    }, 1500)
  }

  const handleSearch = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setSearch(value)
    loadMoreData(1)
  }

  return (
    <>
      <Input value={search} onChange={handleSearch} placeholder="Enter Repository" autoFocus />
      <div id={`repository-list-${username}`} className="max-h-[500px] min-w-full overflow-y-scroll mt-3">
        <InfiniteScroll
          dataLength={page * 5}
          next={loadMoreData}
          hasMore={page * 5 < repositories.length}
          loader={isLoading ? <Skeleton avatar paragraph={{rows: 1}} active /> : null}
          endMessage={<Divider plain>No more data</Divider>}
          scrollableTarget={`repository-list-${username}`}
        >
          <List
            dataSource={repositories.filter(repository => repository.name.includes(search)).slice(0, page * 5 - 1)}
            itemLayout="vertical"
            renderItem={repository => (
              <List.Item key={repository.node_id}>
                <Skeleton loading={isFetching} active>
                  <RepositoryItem repository={repository} />
                </Skeleton>
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </>
  )
}
