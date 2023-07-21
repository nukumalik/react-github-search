import {QueryClientProvider} from 'react-query'
import {queryClient} from './libs/reactQuery'
import {UserList} from './components/UserList'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  )
}

export default App
