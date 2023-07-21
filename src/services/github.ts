import {useMutation, useQuery} from 'react-query'
import {GITHUB_API_URI} from '../config/constants'
import {fetcher} from '../libs/fetcher'
import type {User} from '../types/user'

export class GithubService {
  static getUsers = () => {
    return useQuery<User[]>(`github-users`, async () => await fetcher(`${GITHUB_API_URI}/users?per_page=100`), {
      enabled: false
    })
  }

  static getUserRepositories = () => {
    return useMutation(async (username: string) => {
      return await fetcher(`${GITHUB_API_URI}/users/${username}/repos?per_page=100`, {method: 'GET'})
    })
  }

  static searchUsers = () => {
    return useMutation(
      async (q: string) => await fetcher(`${GITHUB_API_URI}/search/users?q=${q}&&per_page=100`, {method: 'GET'})
    )
  }
}
