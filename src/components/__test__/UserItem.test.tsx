import {render, screen} from '@testing-library/react'
import {UserItem} from '../UserItem/UserItem'
import {vi} from 'vitest'
import {dummyUsers} from './mock/users'

window.matchMedia = query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn()
})

test('renders UserItem component', () => {
  render(<UserItem user={dummyUsers[0]} onCollapse={vi.fn()} />)

  const loginElement = screen.getByText('mojombo')

  expect(loginElement).toBeInTheDocument()
})
