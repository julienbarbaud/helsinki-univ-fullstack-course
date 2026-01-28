import { useState } from 'react'

const Button = ({ text, handler }) => <button onClick={handler}>{text}</button>

const Anecdote = ({ title, anecdote, votes }) => {
  return(
    <>
      <h1>{title}</h1>
      <p>{anecdote}</p>
      <p>({votes} votes)</p>
    </>
  )
}

const TopAnecdote = ({ title, anecdotes, votes, mostVoted }) => {
  if (mostVoted === -1){
    // if no votes, display a simple message instead of a random anecdote:
    return(
    <>
      <h1>{title}</h1> 
      <p>No recorded votes</p>
    </>
    )
  }
  return <Anecdote title={title} anecdote={anecdotes[mostVoted]} votes={votes[mostVoted]}/>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often and say "thank you daddy for making me squeal".',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil. Which logically implies that any genocidal war crime that does not stem from premature optimization is cool.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it. Which is what a fool who thinks that writing code cleverly makes it harder to deal with would say. Writing code stupidly makes it harder to debug.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients. Which is a perfectly reasonable decision for 99.9% of patients a doctor sees.',
    'The only way to go fast, is to go well. Or to give up early'
  ]
 
  const [selected, setSelected] = useState(0)
  //NB: making the vote array an immutable state seems to be overkill in our case, since it only gets updated upon update of selected, which already triggers a render
  const init = new Array(anecdotes.length).fill(0)
  const [votes, setVotes] = useState(init)
  const [mostVoted, setMostVoted] = useState(-1) // initializing as -1 to signal that there is no vote yet
  
  const nextClickHandler = () => setSelected(Math.floor(Math.random()*anecdotes.length))
  const voteClickHandler = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    if (mostVoted === -1 || newVotes[selected] > newVotes[mostVoted]) {
      setMostVoted(selected)
    }
    setVotes(newVotes)
  };


  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} votes={votes[selected]}/>
      <Button text="next" handler={nextClickHandler}/>
      <Button text="vote" handler={voteClickHandler}/>
      <TopAnecdote title="Most voted anecdote" anecdotes={anecdotes} votes={votes} mostVoted={mostVoted}/>
    </div>
  )
}

export default App