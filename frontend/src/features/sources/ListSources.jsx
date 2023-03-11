import { selectAllSources } from "./sourcesApiSlice"
import { useSelector } from "react-redux"

export default function ListSources() {
  const allSources = useSelector(state => selectAllSources(state)); 
  return (
    <div>
      <h1 className="font-bold">All sources</h1>
      {allSources}
    </div>
  )
}