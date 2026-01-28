import { useState } from 'react'

const Button = ({ counter }) => {
  const clickHandler = () => counter.setter(counter.count+1)
  return <button onClick={clickHandler}>{counter.name}</button>
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

// specialized line component for counters which simplifes the passing of data
const CounterLine = ({ counter }) => <StatisticLine text={counter.name} value={counter.count}/>

const FeedbackBlock = ({ counters }) => {
  return(
    <div>
      <h1>Give feedback</h1>
      <Button counter={counters[0]}/>
      <Button counter={counters[1]}/>
      <Button counter={counters[2]}/>
    </div>
  )
}



const StatBlock = ({ counters }) => {
  const total = counters.reduce((total, counter) => total + counter.count, 0)
  if (total === 0){
    // no votes
    return (
    <div>
      <h1>Statistics</h1>
      <p>No feedback yet!</p>
    </div>
    )
  }
  const score = counters[0].count - counters[2].count // positive - negative
  const average = score / total
  const ratio = ( counters[0].count / total) * 100
  return(
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <CounterLine counter={counters[0]}/>
          <CounterLine counter={counters[1]}/>
          <CounterLine counter={counters[2]}/>
          <StatisticLine text="Total" value={total}/>
          <StatisticLine text="Average" value={average.toFixed(2)}/>
          <StatisticLine text="Positive ratio" value={`${ratio.toFixed(1)}%`}/>
        </tbody>
      </table>
    </div>
  )
}

function App() {
  let [goodCount, setGoodCount] = useState(0);
  let [neutralCount, setNeutralCount] = useState(0);
  let [badCount, setBadCount] = useState(0);

  const counters = [
    {name: "good", count: goodCount, setter: setGoodCount},
    {name: "neutral", count: neutralCount, setter: setNeutralCount},
    {name: "bad", count: badCount, setter: setBadCount}
  ]
  return (
    <>
      <FeedbackBlock counters={counters}/>
      <StatBlock counters={counters}/>
    </>
  )
}

export default App
