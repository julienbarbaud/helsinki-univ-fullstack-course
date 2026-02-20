import { createRoot } from 'react-dom/client'
import { createStore } from 'redux'
import App from './App.jsx'
import anecdoteReducer from './reducers/anecdoteReducer.js'
import { Provider } from 'react-redux'
import './index.css'

const store = createStore(anecdoteReducer);

const root = createRoot(document.getElementById('root'))

const renderApp = () => root.render(
  <Provider store={store}>
    <App />
  </Provider>
)

renderApp();
store.subscribe(renderApp);
