function Header(props){
  return <h1>{props.course.name}</h1>
}


function Total(props){
  const total = props.parts.reduce((res, part) => res + part.exercises, 0)
  return <p>Number of exercises: {total}</p>
}


function Part(props){
  return <p>{props.part.name} ({props.part.exercises} exercises)</p>
}


function Content(props){
  //TODO: figure out how to use a loop in the HTML-like syntax
  return(
    <>
      <Part part={props.parts[0]}/>
      <Part part={props.parts[1]}/>
      <Part part={props.parts[2]}/>
    </>
  )
}


function App() {
  const course = {
    name: "Half stack application development",
    parts: [
      {name: "fundamentals of React", exercises: 10},
      {name: "Using props to pass data", exercises: 7},
      {name: "State of a component", exercises: 14},
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App
