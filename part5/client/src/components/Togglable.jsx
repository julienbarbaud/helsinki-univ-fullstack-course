import { useState } from "react"

const Togglable = ({ children, toggleText, hideText, asTable=false }) => {
  const [toggledOn, setToggleOn] = useState(false)

  const button = <button onClick={() => setToggleOn(!toggledOn)}>{toggledOn? hideText : toggleText}</button>;
  return(
    <>
      { asTable ? <tr><td>{button}</td></tr> : button }
      {(toggledOn && children)}
    </>
  )
}

export default Togglable
