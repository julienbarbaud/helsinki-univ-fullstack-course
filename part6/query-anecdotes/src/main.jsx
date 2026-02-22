import ReactDOM from 'react-dom/client'
import App from './App'
import { NotificationContextProvider } from './reducers/notificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext } from 'react'

const queryClient = new QueryClient()
const context = createContext();

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <NotificationContextProvider>
      <App />
    </NotificationContextProvider>
  </QueryClientProvider>
)
