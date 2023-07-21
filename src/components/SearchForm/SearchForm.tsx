import {Button, Input} from 'antd'
import {ChangeEvent, FC, FormEvent, useState} from 'react'

export interface SearchFormProps {
  isSubmit: boolean
  onSubmit: (value: string) => void
}

export const SearchForm: FC<SearchFormProps> = ({isSubmit, onSubmit}) => {
  const [username, setUsername] = useState('')

  const handleChange = ({target: {value}}: ChangeEvent<HTMLInputElement>) => {
    setUsername(value)
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(username)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Enter username"
        value={username}
        onChange={handleChange}
        disabled={isSubmit}
        className="mb-3"
        size="large"
      />
      <Button size="large" type="primary" htmlType="submit" disabled={isSubmit} className="w-full">
        Search
      </Button>
    </form>
  )
}
