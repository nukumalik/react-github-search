import {Divider, List, Skeleton, Typography} from 'antd'
import {SearchForm} from '../SearchForm'
import {useEffect, useState} from 'react'
import {GithubService} from '../../services/github'
import {User} from '../../types/user'
import {UserItem} from '../UserItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import type {Repository} from '../../types/repository'
import type {Search} from '../../types/search'

export const UserList = () => {
  const [page, setPage] = useState(1)
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [username, setUsername] = useState('')
  const getUsers = GithubService.getUsers()
  const getUserRepositories = GithubService.getUserRepositories()
  const searchUsers = GithubService.searchUsers()

  const handleGetUserRepositories = (value: string | string[]) => {
    if (!value.length) return
    const username = value[0]
    getUserRepositories.mutateAsync(username).then((repositories: Repository[]) => {
      setUsers(users.map(user => (user.login === username ? {...user, repositories} : user)))
    })
  }

  const handleGetUsers = () => {
    getUsers.refetch().then(value => setUsers(value.data || []))
  }

  const loadMoreData = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPage(page + 1)
      setIsLoading(false)
    }, 1500)
  }

  useEffect(() => {
    handleGetUsers()
  }, [])

  useEffect(() => {
    if (username) {
      setPage(1)
      searchUsers.mutateAsync(username).then((value: Search<User>) => setUsers(value.items))
    } else {
      handleGetUsers()
    }
  }, [username])

  return (
    <div className="mx-auto max-w-3xl min-h-[100vh]">
      <SearchForm isSubmit={searchUsers.isLoading || getUsers.isLoading} onSubmit={setUsername} />

      {username && <Typography className="mt-3">Showing users for &quot;{username}&quot;</Typography>}

      <InfiniteScroll
        dataLength={page * 10}
        next={loadMoreData}
        hasMore={page * 10 < users.length}
        loader={isLoading ? <Skeleton avatar paragraph={{rows: 1}} active /> : null}
        endMessage={<Divider plain>No more data</Divider>}
      >
        <List
          dataSource={users.slice(0, page * 10 - 1)}
          itemLayout="vertical"
          renderItem={user => (
            <List.Item key={user.login}>
              <Skeleton loading={searchUsers.isLoading || getUsers.isLoading} active>
                <UserItem
                  onCollapse={handleGetUserRepositories}
                  user={user}
                  isFetching={getUserRepositories.isLoading}
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}
