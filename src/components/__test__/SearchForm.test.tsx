import {render, screen, fireEvent} from '@testing-library/react'
import {SearchForm} from '../SearchForm/SearchForm'
import '@testing-library/jest-dom'
import {vi} from 'vitest'

test('renders SearchForm component', async () => {
  render(<SearchForm isSubmit={false} onSubmit={vi.fn()} />)

  const inputElement = screen.getByPlaceholderText('Enter username')
  const buttonElement = screen.getByRole('button', {name: /search/i})

  expect(inputElement).toBeInTheDocument()
  expect(buttonElement).toBeInTheDocument()
})

test('handles input change', () => {
  render(<SearchForm isSubmit={false} onSubmit={vi.fn()} />)

  const inputElement: HTMLInputElement = screen.getByPlaceholderText('Enter username')

  fireEvent.change(inputElement, {target: {value: 'JohnDoe'}})

  expect(inputElement.value).toBe('JohnDoe')
})

test('handles form submission', () => {
  const handleSubmit = vi.fn()
  render(<SearchForm isSubmit={false} onSubmit={handleSubmit} />)

  const inputElement = screen.getByPlaceholderText('Enter username')
  const buttonElement = screen.getByRole('button', {name: /search/i})

  fireEvent.change(inputElement, {target: {value: 'JohnDoe'}})
  fireEvent.click(buttonElement)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith('JohnDoe')
})

test('disables input and button during submission', () => {
  render(<SearchForm isSubmit={true} onSubmit={vi.fn()} />)

  const inputElement = screen.getByPlaceholderText('Enter username')
  const buttonElement = screen.getByRole('button', {name: /search/i})

  expect(inputElement).toBeDisabled()
  expect(buttonElement).toBeDisabled()
})
