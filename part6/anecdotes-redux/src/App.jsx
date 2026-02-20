import AnecdoteList from './components/AnecdoteList';
import Filter from './components/Filter';
import NewAnecdoteForm from './components/NewAnecdoteForm';
import Notification from './components/Notification';

function App() {
  return (
    <div>
      <Notification/>
      <h2>Write anecdote:</h2>
      <NewAnecdoteForm/>
      <h2>Anecdotes:</h2>
      <Filter/>
      <AnecdoteList/>
    </div>
  )
}

export default App
