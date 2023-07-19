import {useQuery} from 'react-query'
import {GITHUB_API_URI} from '../config/constants'

export class githubServices {
  static getUsers = (page: number, limit: number) => {
    return useQuery(`repositories-page_${page}-limit_${limit}`, async () =>
      (await fetch(`${GITHUB_API_URI}/users`)).json()
    )
  }

  static searchUsers = (user: string) => {
    return useQuery(`search-repositories-q_${user}`, async () =>
      (await fetch(`${GITHUB_API_URI}/search/users?q=${user}`, {method: 'GET'})).json()
    )
  }
}
