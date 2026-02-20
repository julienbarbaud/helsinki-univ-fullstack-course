import AnecdoteList from './components/AnecdoteList';
import NewAnecdoteForm from './components/NewAnecdoteForm';

function App() {
  return (
    <div>
      <h2>Write anecdote:</h2>
      <NewAnecdoteForm/>
      <h2>Anecdotes:</h2>
      <AnecdoteList/>
    </div>
  )
}

export default App
