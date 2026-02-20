import { useDispatch } from "react-redux"
import { setFilter } from "../reducers/filterReducer"

const Filter = () => {
  const dispatch = useDispatch();
  return(
    <label>filter:
      <input onChange={(event) => dispatch(setFilter(event.target.value))}/>
    </label>
  )
}

export default Filter
