import { useEffect, useState } from "react"

const useDebounce = (value, ms) => {
  const [debounceValue, setDebounceValue] = useState("")
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setDebounceValue(value)
    }, [ms])
    return () => {
      clearTimeout(timeoutID)
    }
  }, [value])
  return debounceValue
}

export default useDebounce
