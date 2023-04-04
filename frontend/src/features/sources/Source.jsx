import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectSourceById, useGetSourcesQuery } from "./sourcesApiSlice";
import NotePreview from "../notes/NotePreview";

export default function Source() {
  const location = useLocation(); 
  const { sourceID } = location.state; 
  const { isLoading, isError } = useGetSourcesQuery(); 
  const source = useSelector((state) => selectSourceById(state, sourceID)); 
  let display = null; 
  if (isLoading) 
    display = <div>Loading...</div>
  else if (isError) 
    display = <div>Unable to display source</div> 
  else {
    display = (
      <div>
        <h1 className="text-3xl font-bold">{source.title}</h1> 
        <h2 className="font-italic text-blue-600">Origin: {source.origin}</h2>
        <div>URL: <a href="#">{source.url ?? "None"}</a></div>
        <br/>
        <p className="">{source.description}</p>
        <div className="text-2xl font-bold">Recent Notes</div>
        {console.log(source.noteIDs)}
        {source.noteIDs.map(noteID => <NotePreview noteID={noteID}/>)}
      </div>
    )
  }
  return display; 
}