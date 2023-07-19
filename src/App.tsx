import {QueryClientProvider} from 'react-query'
import {queryClient} from './libs/reactQuery'

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <h1>Hello, World</h1>
      </div>
    </QueryClientProvider>
  )
}

export default App
