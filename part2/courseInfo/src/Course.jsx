function Header({ title }){
  return <h2>{title}</h2>
}


function Total({ parts }){
  const total = parts.reduce((res, part) => res + part.exercises, 0)
  return <p><b>Number of exercises: {total}</b></p>
}


function Part(props){
  return <p>{props.part.name} ({props.part.exercises} exercises)</p>
}


function Content({ parts }){
  //TODO: figure out how to use a loop in the HTML-like syntax
  return(
    <>
      {parts.map(part=><Part key={part.id} part={part}/>)}
    </>
  )
}

function Course({ course }){
    return (
    <div>
      <br></br>  
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}


export default Course