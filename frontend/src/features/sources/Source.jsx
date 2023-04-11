import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectSourceById, useGetSourcesQuery } from "./sourcesApiSlice";
import NotePreview from "../notes/NotePreview";
import { useState } from "react";
import CreateNewNote from "../notes/CreateNewNote";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Source() {
  const location = useLocation(); 
  const { sourceID } = location.state; 
  const { isLoading, isError } = useGetSourcesQuery(); 
  const source = useSelector((state) => selectSourceById(state, sourceID)); 
  
  // Component's state
  const [newNoteFormVisible, setFormVisibility] = useState(false)
  let newNoteForm = null;  
  let noteButtonText = null; 
  if (newNoteFormVisible) {
    newNoteForm = <CreateNewNote source={source} />
    noteButtonText = "Hide";
  } else {
    newNoteForm = null;
    noteButtonText = "New note"; 
  }

  const toggleFormVisibility = () => setFormVisibility(newNoteFormVisible ^ 1);

  // Load source
  let display = null; 
  if (isLoading) display = <div>Loading...</div>
  else if (isError) display = <div>Unable to display source</div> 
  else {
    display = (
      <div className="p-10">
        <div className="flex justify-between items-baseline">
          <h1 className="text-3xl font-bold">{source.title}</h1> 
          <button>
            <FontAwesomeIcon icon={faEdit}/>
          </button>
        </div>
        <hr className="h-1 bg-green-600"/>
        <h2 className="font-italic text-blue-600">Origin: {source.origin}</h2>
        <div>URL: <a href="#">{source.url ?? "None"}</a></div>
        <br/>
        <p className="">{source.description}</p>
        <div className="flex justify-between mt-5 font-bold items-baseline">
          <div className="text-2xl">Notes</div>
          <div className="align-text-bottom mb-2">
            <button 
              id="newNoteButton"
              onClick={toggleFormVisibility}
              className="border-2 border-black rounded-full w-fit px-5"
            >{noteButtonText}</button>
            <button className="border-black underline border-r-2 rounded-l-full px-5">Category</button>
            <button className="border-black underline rounded-r-full px-5">Tree</button>
          </div>
        </div>
        <hr className="h-1 bg-green-600"/>
        {newNoteForm}
        {console.log(source.noteIDs)}
        {source.noteIDs.map(noteID => <div className="m-1"><NotePreview key={noteID} noteID={noteID}/></div>)}
      </div>
    )
  }
  return display; 
}