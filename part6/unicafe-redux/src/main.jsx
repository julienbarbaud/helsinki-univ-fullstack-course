import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const VoteButton = ({ type }) => <button onClick={() => store.dispatch({ type })}>{type}</button>;

const VoteDisplay = ({ type }) => <div>{type}: {store.getState()[type]}</div>;

const types = ['GOOD', 'OK', 'BAD']

const App = () => {
  return (
    <div>
      {types.map((type) => <VoteButton key={type} type={type}/>)}
      {types.map((type) => <VoteDisplay key={type} type={type.toLowerCase()}/>)}
      <VoteButton type='RESET'/>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
