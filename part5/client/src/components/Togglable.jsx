import { useState } from "react"

const Togglable = ({ children, toggleText, hideText }) => {
  const [toggledOn, setToggleOn] = useState(false)


  return(
    <>
      <button onClick={() => setToggleOn(!toggledOn)}>{toggledOn? hideText : toggleText}</button>
      {(toggledOn && children)}
    </>
  )
}

export default Togglable
