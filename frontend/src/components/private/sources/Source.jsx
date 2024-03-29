import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSourceById, useGetSourcesQuery } from "../../../features/sources/sourcesApiSlice";
import NotePreview from "../notes/NotePreview";
import { useState } from "react";
import CreateNewNote from "../notes/CreateNewNote";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Source() {
  
  const { sourceID } = useParams();
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
        <hr className="h-1 bg-blue-500 mb-5 mt-2"/>
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
              className="text-blue-500 hover:text-blue-700 w-fit px-5 border-black border-r-2"
            >{noteButtonText}</button>
            <button className="border-black underline border-r-2 rounded-l-full px-5">Category</button>
            <button className="border-black underline rounded-r-full px-5">Tree</button>
          </div>
        </div>
        <hr className="h-1 bg-blue-500 mb-5"/>
        {newNoteForm}
        {console.log(source.noteIDs)}
        {source.noteIDs.map(noteID => <div key={noteID} className="m-1">
          <NotePreview sourceID={sourceID} noteID={noteID}/>
        </div>)}
      </div>
    )
  }
  return display; 
}