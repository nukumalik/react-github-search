import {render, screen} from '@testing-library/react'
import {RepositoryItem} from '../RepositoryItem'
import {dummyRepositories} from './mock/repositories'

test('renders RepositoryItem component', () => {
  render(<RepositoryItem repository={dummyRepositories[0]} />)

  const titleElement = screen.getByText('30daysoflaptops.github.io')
  const forksElement = screen.getByText('123')
  const stargazersElement = screen.getByText('234')
  const linkElement = screen.getByRole('link')

  expect(titleElement).toBeInTheDocument()
  expect(forksElement).toBeInTheDocument()
  expect(stargazersElement).toBeInTheDocument()
  expect(linkElement).toHaveAttribute('href', 'https://github.com/mojombo/30daysoflaptops.github.io')
})
