import { useState } from "react"

export const useField = (name, defaultValue='') => {
  const [value, setField] = useState(defaultValue);
  const onChange = (event) => setField(event.target.value);
  const reset = () => setField('');
  return {
    name,
    value,
    onChange,
    reset,
  }
}
