function Header(props){
  return(
    <h1>{props.title}</h1>
  )
}


function Total(props){
  const total = props.exercises.reduce((res, ex) => res + ex)
  return(<p>Number of exercises: {total}</p>)
}


function Part(props){
  return(<p>{props.name} ({props.exercises} exercises)</p>)  
}


function Content(props){
  //TODO: figure out how to use a loop in the HTML-like syntax
  return(
    <>
    <Part name={props.parts[0]} exercises={props.exercises[0]}/>
    <Part name={props.parts[1]} exercises={props.exercises[1]}/>
    <Part name={props.parts[2]} exercises={props.exercises[2]}/>
    </>
  )
}


function App() {
  const course = "Half stack application development"
  const exercises = [10, 7, 14]
  const parts = [
    "fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ]


  return (
    <div>
      <Header title={course}/>
      <Content parts={parts} exercises={exercises}/>
      <Total exercises={exercises}/>
    </div>
  )
}

export default App
